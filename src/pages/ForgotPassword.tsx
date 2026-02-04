import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">NAVSPRO</h1>
          </Link>
        </div>

        <Card className="border-0 shadow-medium">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                  <CardDescription>
                    No worries, we'll send you reset instructions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button variant="hero" size="lg" className="w-full" type="submit">
                      Reset Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
                    </Link>
                  </form>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="space-y-4 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                  <CardDescription className="text-base">
                    We sent a password reset link to
                    <br />
                    <span className="font-medium text-foreground">{email}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <a href={`mailto:${email}`}>
                      Open Email App
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Didn't receive the email?{" "}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="font-semibold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      Click to resend
                    </button>
                  </p>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Help link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help?{" "}
          <Link to="/contact" className="text-secondary hover:underline">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
