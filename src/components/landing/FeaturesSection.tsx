import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Brain, 
  FileText, 
  LineChart, 
  MessageCircle, 
  Shield, 
  Smartphone,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Psychometric Assessments",
    description: "Validated frameworks measuring personality, aptitude, interests, and learning styles.",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: FileText,
    title: "Visual Reports",
    description: "Beautiful, easy-to-understand reports with charts and plain-language explanations.",
    gradient: "from-secondary/20 to-teal-500/10",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Watch your growth over time with before/after comparisons and streak indicators.",
    gradient: "from-success/20 to-emerald-500/10",
  },
  {
    icon: MessageCircle,
    title: "Expert Mentorship",
    description: "Connect with experienced mentors for personalized guidance and support.",
    gradient: "from-accent/20 to-orange-500/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is secure and never shared. We prioritize student privacy above all.",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Take assessments and track progress anywhere, on any device.",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Card glow on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
      
      <div className={`relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-soft overflow-hidden h-full`}>
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50`} />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div 
            className="w-14 h-14 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <feature.icon className="w-7 h-7 text-secondary" />
          </motion.div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" />
            Features
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Thrive</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed with students and schools in mind
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
