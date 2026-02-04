import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && session) {
      navigate("/dashboard");
    }
  }, [session, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-secondary/30 blur-2xl animate-float" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">NAVSPRO</h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Your AI-Powered Career Navigator
            </p>

            <div className="space-y-6 max-w-md">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold">Personalized Guidance</h3>
                  <p className="text-sm text-primary-foreground/70">AI-driven career recommendations</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold">Track Your Progress</h3>
                  <p className="text-sm text-primary-foreground/70">Monitor your career readiness journey</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold">Achieve Your Goals</h3>
                  <p className="text-sm text-primary-foreground/70">Step-by-step career development</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">NAVSPRO</h1>
            <p className="text-muted-foreground">Your AI-Powered Career Navigator</p>
          </div>

          <Card className="border-0 shadow-medium">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-secondary hover:text-secondary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                    Remember me for 30 days
                  </Label>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6 pt-4">
                <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              <div className="relative">
                {/* Google login removed */}
              </div>


              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-secondary hover:text-secondary/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
