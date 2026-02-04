import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navLinks = [
  { label: "How It Works", href: "#journey" },
  { label: "Features", href: "#features" },
  { label: "For Schools", href: "#schools" },
  { label: "About", href: "#about" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-soft py-3 border-b border-border/50"
          : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary via-secondary to-teal-400 flex items-center justify-center shadow-glow group-hover:shadow-[0_0_30px_hsl(173_58%_39%/0.5)] transition-shadow">
                <span className="text-secondary-foreground font-bold text-lg">N</span>
              </div>
              <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
                NAVSPRO
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary group-hover:w-1/2 transition-all duration-300`} />
                </motion.a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Button
                    variant={isScrolled ? "ghost" : "heroOutline"}
                    size="sm"
                    className="font-medium gap-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={isScrolled ? "ghost" : "heroOutline"}
                    size="sm"
                    className="font-medium gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={isScrolled ? "ghost" : "heroOutline"}
                    size="sm"
                    className="font-medium"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isScrolled ? "default" : "hero"}
                      size="sm"
                      className="font-medium"
                      onClick={() => navigate("/signup")}
                    >
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative pt-24 px-6"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="py-4 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 pt-8 mt-8 border-t border-border"
              >
                {user ? (
                  <>
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full gap-2"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard className="w-4 h-4 ml-1" />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 ml-1" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        navigate("/signup");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
