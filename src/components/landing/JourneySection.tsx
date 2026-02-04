import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  HelpCircle, 
  ClipboardCheck, 
  BarChart3, 
  LayoutDashboard, 
  Users,
  ArrowDown
} from "lucide-react";

const journeySteps = [
  {
    icon: HelpCircle,
    phase: "Problem",
    title: "Confusion & Pressure",
    description: "Students face overwhelming choices without proper guidance. The pressure to decide early can lead to wrong paths.",
    gradient: "from-warning/20 to-warning/5",
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
    lineColor: "from-warning to-secondary",
  },
  {
    icon: ClipboardCheck,
    phase: "Assessment",
    title: "Science-Backed Discovery",
    description: "Our comprehensive assessment analyzes personality, aptitude, and interests through validated psychological frameworks.",
    gradient: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    lineColor: "from-secondary to-secondary",
  },
  {
    icon: BarChart3,
    phase: "Report",
    title: "Visual Clarity",
    description: "Receive a beautiful, easy-to-understand report with actionable insights, not just scores and numbers.",
    gradient: "from-secondary/20 to-primary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    lineColor: "from-secondary to-success",
  },
  {
    icon: LayoutDashboard,
    phase: "Dashboard",
    title: "Guided Growth",
    description: "Track progress, complete personalized tasks, and build skills that align with your unique profile.",
    gradient: "from-success/20 to-success/5",
    iconBg: "bg-success/20",
    iconColor: "text-success",
    lineColor: "from-success to-accent",
  },
  {
    icon: Users,
    phase: "Mentorship",
    title: "Human Support",
    description: "Connect with experienced mentors who provide personalized guidance and help navigate your journey.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    lineColor: "from-accent to-accent",
  },
];

const StepCard = ({ step, index, totalSteps }: { step: typeof journeySteps[0]; index: number; totalSteps: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
    >
      {/* Connecting line */}
      {index < totalSteps - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`absolute left-8 top-20 w-0.5 h-32 origin-top bg-gradient-to-b ${step.lineColor} opacity-30 hidden md:block`}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className={`flex items-start gap-6 md:gap-8 ${index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""}`}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
          className="flex-shrink-0"
        >
          <div className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center relative`}>
            <step.icon className={`w-7 h-7 ${step.iconColor}`} />
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              className={`absolute inset-0 rounded-2xl ${step.iconBg}`}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className={`flex-1 p-6 md:p-8 rounded-2xl bg-gradient-to-br ${step.gradient} backdrop-blur-sm border border-border/30 shadow-soft`}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
            className={`inline-block text-sm font-bold ${step.iconColor} uppercase tracking-wider mb-2`}
          >
            {String(index + 1).padStart(2, '0')}. {step.phase}
          </motion.span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {step.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const JourneySection = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
            The Journey
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            From Confusion to{" "}
            <span className="relative inline-block">
              <span className="text-gradient-secondary">Clarity</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                initial={{ pathLength: 0 }}
                animate={isHeaderInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0 4 Q50 0, 100 4 T200 4"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A step-by-step journey that transforms uncertainty into purposeful direction
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {journeySteps.map((step, index) => (
            <StepCard key={step.phase} step={step} index={index} totalSteps={journeySteps.length} />
          ))}
        </div>
      </div>
    </section>
  );
};
