import { Handler } from '@netlify/functions';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = JSON.parse(event.body || '{}');

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required parameters including userId' }),
            };
        }

        const secret = process.env.RAZORPAY_KEY_SECRET || '';

        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment is valid! Update Supabase securely
            const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
            const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

            if (!supabaseServiceRole) {
                console.error("Missing SUPABASE_SERVICE_ROLE_KEY in environment variables.");
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Server configuration error' }),
                };
            }

            const supabase = createClient(supabaseUrl, supabaseServiceRole);

            // Update user profile to mark as premium
            const { error: dbError } = await supabase
                .from('profiles')
                .update({ is_premium: true })
                .eq('id', userId);

            if (dbError) {
                console.error('Error updating Supabase profile:', dbError);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to update user profile' }),
                };
            }

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'success', message: 'Payment verified successfully and profile upgraded' }),
            };
        } else {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'failure', message: 'Invalid Signature' }),
            };
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to verify payment' }),
        };
    }
};
