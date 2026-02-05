import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token_hash || !type) {
                setStatus("error");
                setMessage("Invalid verification link.");
                return;
            }

            try {
                console.log("Verifying token:", token_hash, "type:", type);

                const { error, data } = await supabase.auth.verifyOtp({
                    token_hash,
                    type: type as any,
                });

                console.log("Verify result:", { error, data });

                if (error) throw error;

                // Check if session was actually created
                const { data: { session } } = await supabase.auth.getSession();
                console.log("Session after verification:", session);

                if (!session) {
                    console.warn("No session found after successful verification");
                }

                setStatus("success");
                setMessage("Your email has been verified successfully. Redirecting...");
                toast.success("Email verified!");

                // Auto redirect to dashboard after 2 seconds
                setTimeout(() => {
                    // Force a hard reload if needed, or just navigate
                    // Using window.location to ensure fresh state
                    window.location.href = "/dashboard";
                }, 2000);

            } catch (error: any) {
                console.error("Verification error:", error);
                setStatus("error");
                setMessage(error.message || "Failed to verify email.");
                toast.error("Verification failed");
            }
        };

        verifyEmail();
    }, [token_hash, type]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center"
            >
                {status === "loading" && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                        >
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Verifying...</h1>
                        <p className="text-muted-foreground">{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                        >
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-foreground mb-3"
                        >
                            Email Verified!
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-muted-foreground mb-8"
                        >
                            Your account is now active. You can close this page and log in to NAVSPRO to start your career discovery journey.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Button asChild variant="hero" size="lg" className="w-full max-w-xs">
                                <Link to="/dashboard">
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </>
                )}

                {status === "error" && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
                        >
                            <XCircle className="w-10 h-10 text-destructive" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Verification Failed</h1>
                        <p className="text-muted-foreground mb-6">{message}</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                        <div className="mt-4">
                            <Link to="/login" className="text-sm text-muted-foreground hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xs text-muted-foreground mt-8"
                >
                    Having trouble? Contact us at support@navspro.com
                </motion.p>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
