import { motion } from "framer-motion";
import { TrendingUp, Award, Clock, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Overall Progress",
    value: "76%",
    change: "+8%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Assessments Done",
    value: "12/15",
    change: "3 left",
    trend: "neutral",
    icon: CheckCircle2,
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "Study Hours",
    value: "24h",
    change: "This week",
    trend: "up",
    icon: Clock,
    color: "bg-accent/10 text-accent",
  },
  {
    label: "Achievements",
    value: "8",
    change: "+2 new",
    trend: "up",
    icon: Award,
    color: "bg-success/10 text-success",
  },
];

export function ProgressSnapshot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Progress Snapshot</h2>
          <p className="text-sm text-muted-foreground">Your journey at a glance</p>
        </div>
        <button className="text-sm text-primary hover:underline">View details</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/50"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Career Readiness</span>
          <span className="text-sm font-semibold text-primary">76%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "76%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Complete 3 more assessments to reach your goal
        </p>
      </div>
    </motion.div>
  );
}
