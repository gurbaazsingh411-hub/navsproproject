import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const focusTasks = [
  {
    id: 1,
    title: "Complete Personality Assessment",
    description: "15 min estimated",
    completed: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Review Career Matches",
    description: "Based on your recent results",
    completed: false,
    priority: "high",
  },
  {
    id: 3,
    title: "Read mentor feedback",
    description: "New message from Dr. Smith",
    completed: false,
    priority: "medium",
  },
  {
    id: 4,
    title: "Set weekly goals",
    description: "Plan your focus areas",
    completed: false,
    priority: "low",
  },
];

const priorityColors = {
  high: "border-l-accent",
  medium: "border-l-secondary",
  low: "border-l-muted-foreground",
};

export function TodaysFocus() {
  const completedCount = focusTasks.filter((t) => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Today's Focus</h2>
            <p className="text-sm text-muted-foreground">
              {completedCount}/{focusTasks.length} completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="4"
                strokeDasharray={`${(completedCount / focusTasks.length) * 126} 126`}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-bold text-foreground">
              {Math.round((completedCount / focusTasks.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {focusTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${priorityColors[task.priority]} bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group`}
          >
            <button className="mt-0.5 shrink-0">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{task.description}</p>
            </div>
            {!task.completed && (
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4 border-dashed hover:border-primary hover:bg-primary/5"
      >
        Add custom task
      </Button>
    </motion.div>
  );
}
