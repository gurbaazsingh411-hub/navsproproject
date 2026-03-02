import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface PaymentButtonProps {
    amount: number; // in paise
    description?: string;
    onSuccess?: () => void;
    className?: string;
}

export function PaymentButton({ amount, description = "Premium Career Assessment", onSuccess, className }: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Helper to dynamically load external scripts securely
    const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        if (!user) {
            toast.error("Please log in to continue");
            return;
        }

        setLoading(true);

        try {
            // 1. Load Razorpay script
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you offline?');
                return;
            }

            // 2. Call your backend to create the Order
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, currency: 'INR', userId: user.id })
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();

            // 3. Configure Razorpay modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key', // Public Key
                amount: data.amount,
                currency: data.currency,
                name: 'NAVSPRO',
                description: description,
                order_id: data.id, // The order_id returned from backend
                handler: async (response: any) => {
                    try {
                        // 4. Send response to backend to verify payment signature
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: user.id, // Important for secure database updates
                            }),
                        });

                        if (!verifyRes.ok) {
                            throw new Error("Payment verification failed");
                        }

                        toast.success("Payment Successful!");
                        if (onSuccess) onSuccess();

                    } catch (err: any) {
                        console.error(err);
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user?.user_metadata?.full_name || '',
                    email: user?.email || '',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                toast.error(`Payment failed: ${response.error.description}`);
            });
            paymentObject.open();

        } catch (error: any) {
            console.error(error);
            toast.error("Could not initiate payment. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={displayRazorpay} disabled={loading} className={className} variant="hero">
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                </>
            ) : (
                'Upgrade to Premium (₹500)'
            )}
        </Button>
    );
}
