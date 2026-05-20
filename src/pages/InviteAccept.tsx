import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const InviteAccept = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidInvite, setIsValidInvite] = useState<boolean | null>(null);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[!@#$%^&*]/.test(password) },
  ];
  const passwordStrength = passwordRequirements.filter((r) => r.met).length;

  // Validate invite token on mount
  useEffect(() => {
    const validateInvite = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // Check if hash has access_token
        if (!window.location.hash.includes("access_token")) {
          toast.error("Invalid or expired invite link.");
          setIsValidInvite(false);
          return;
        }
      }

      // If we have a session, extract email from user metadata
      if (session?.user) {
        setEmail(session.user.email || "");
        setFullName(session.user.user_metadata?.full_name || "");
        setIsValidInvite(true);
      }
    };

    validateInvite();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      toast.error("Name is required.");
      return;
    }

    if (passwordStrength < 4) {
      setError("Please ensure your password meets all the strength requirements.");
      toast.error("Password does not meet requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Update user profile with full name and new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
        data: {
          full_name: fullName,
        },
      });

      if (updateError) throw updateError;

      // Create profile in the profiles table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: fullName,
          email: user.email,
          updated_at: new Date().toISOString(),
        });
      }

      setIsSuccess(true);
      toast.success("Account activated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to activate account. Please try again.");
      toast.error(err.message || "Failed to activate account.");
    } finally {
      setLoading(false);
    }
  };

  if (isValidInvite === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="fixed top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 left-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Validating your invite...</p>
        </motion.div>
      </div>
    );
  }

  if (isValidInvite === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="fixed top-20 right-20 w-64 h-64 rounded-full bg-destructive/10 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="border-0 shadow-medium">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold mb-2">Invalid Invite Link</CardTitle>
              <CardDescription className="mb-4">
                This invite link is invalid or has expired. Please contact your administrator for a new invite.
              </CardDescription>
              <Button variant="hero" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background glows */}
      <div className="fixed top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-medium">
          <CardHeader className="space-y-1 pb-2">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Welcome to Navspro!</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Your account has been activated. You can now log in and start your journey.
                  </CardDescription>
                </motion.div>
              ) : (
                <motion.div key="form-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Activate Your Account</CardTitle>
                  <CardDescription className="text-center mt-1">
                    You've been invited to join Navspro. Set your password to get started.
                  </CardDescription>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-center"
                >
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate("/login")}
                  >
                    Go to Sign In
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setError(""); }}
                      className="pl-3"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="pl-3 bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">This email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Set Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                        className="pl-3 pr-10"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {password && (
                      <div className="space-y-2 pt-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${passwordStrength >= level
                                  ? passwordStrength <= 1
                                    ? "bg-destructive"
                                    : passwordStrength <= 2
                                      ? "bg-warning"
                                      : passwordStrength <= 3
                                        ? "bg-secondary"
                                        : "bg-success"
                                  : "bg-muted"
                                }`}
                            />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {passwordRequirements.map((req, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-1.5 text-xs transition-colors ${req.met ? "text-success" : "text-muted-foreground"
                                }`}
                            >
                              <Check className={`h-3 w-3 ${req.met ? "opacity-100" : "opacity-30"}`} />
                              {req.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                      className="pl-3"
                      required
                      minLength={8}
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3"
                      >
                        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Activating Account...
                      </>
                    ) : (
                      "Activate Account"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InviteAccept;
