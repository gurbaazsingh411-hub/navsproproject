import { Handler } from '@netlify/functions';
import Razorpay from 'razorpay';

export const handler: Handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { amount, currency, userId } = JSON.parse(event.body || '{}');

        if (!amount || !currency || !userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing amount, currency, or userId' }),
            };
        }

        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || '',
            key_secret: process.env.RAZORPAY_KEY_SECRET || '',
        });

        const options = {
            amount: amount, // amount in smallest currency unit
            currency: currency,
            receipt: `receipt_order_${Date.now()}`,
            notes: {
                userId: userId, // Embed critical tracking data in Razorpay
            }
        };

        const order = await razorpay.orders.create(options);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        };
    } catch (error) {
        console.error('Error creating order:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create order' }),
        };
    }
};
