import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  "10-minute assessment",
  "Instant visual results",
  "Expert mentor matching",
  "Progress tracking dashboard",
];

export const CTASection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden bg-[linear-gradient(135deg,hsl(243_47%_12%)_0%,hsl(243_47%_18%)_50%,hsl(220_35%_22%)_100%)]"
    >
      {/* Animated background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Start Your Journey Today</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 text-center leading-tight"
          >
            Ready to Discover Your{" "}
            <span className="relative inline-block">
              <span className="text-gradient-secondary">True Potential</span>
              <motion.div
                className="absolute -inset-x-2 -inset-y-1 bg-secondary/10 rounded-lg -z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/60 mb-10 max-w-2xl mx-auto text-center"
          >
            Join thousands of students who have found clarity and direction through
            NAVSPRO's personalized guidance system.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <Check className="w-4 h-4 text-secondary" />
                <span className="text-sm text-primary-foreground/80">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="hero"
                size="xl"
                className="group relative overflow-hidden min-w-[240px]"
                onClick={() => navigate("/signup")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="heroOutline" size="lg">
                Schedule a Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-primary-foreground/40 text-sm mt-10 text-center"
          >
            No credit card required • Results in minutes • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
