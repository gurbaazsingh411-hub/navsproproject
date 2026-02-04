import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Target } from "lucide-react";

interface InsightsSummaryProps {
  strengths: string[];
  growthAreas: string[];
  recommendedPaths: string[];
}

export const InsightsSummary = ({ strengths, growthAreas, recommendedPaths }: InsightsSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid md:grid-cols-3 gap-6"
    >
      {/* Strengths */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="font-semibold text-foreground">Your Strengths</h3>
        </div>
        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
              {strength}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Growth Areas */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Areas to Develop</h3>
        </div>
        <ul className="space-y-3">
          {growthAreas.map((area, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 shrink-0" />
              {area}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Recommended Paths */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Recommended Paths</h3>
        </div>
        <ul className="space-y-3">
          {recommendedPaths.map((path, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                {index + 1}
              </span>
              <span className="text-foreground">{path}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
