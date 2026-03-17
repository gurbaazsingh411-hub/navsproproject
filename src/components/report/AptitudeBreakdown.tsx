import { motion } from "framer-motion";
import { DimensionScore } from "@/lib/scoringUtils";
import { cn } from "@/lib/utils";

interface AptitudeBreakdownProps {
  metrics: DimensionScore[];
}

export const AptitudeBreakdown = ({ metrics }: AptitudeBreakdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <span className="text-xl">🧩</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Aptitude Breakdown</h3>
          <p className="text-sm text-muted-foreground">Your natural cognitive strengths</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-foreground">{metric.name}</span>
              <span className="text-sm font-semibold text-foreground">{Math.round(metric.percentage)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.percentage}%` }}
                transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                className={cn(
                  "h-full rounded-full",
                  metric.percentage >= 70 ? "bg-blue-500" : 
                  metric.percentage >= 40 ? "bg-blue-400" : "bg-blue-300"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
