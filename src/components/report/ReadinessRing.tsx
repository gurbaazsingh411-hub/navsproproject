import { motion } from "framer-motion";

interface ReadinessRingProps {
  score: number;
  size?: number;
}

export const ReadinessRing = ({ score, size = 160 }: ReadinessRingProps) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Developing";
    return "Early Stage";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--secondary))";
    if (score >= 60) return "hsl(var(--primary))";
    return "hsl(var(--muted-foreground))";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <span className="text-xl">🎯</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Career Readiness</h3>
          <p className="text-sm text-muted-foreground">Your overall preparedness index</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={getScoreColor(score)}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="text-4xl font-bold text-foreground"
            >
              {score}%
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-muted-foreground"
            >
              {getScoreLabel(score)}
            </motion.span>
          </div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-center max-w-xs"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            This score reflects your current alignment between interests, aptitudes, and self-awareness. 
            It's a starting point, not a limit.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
