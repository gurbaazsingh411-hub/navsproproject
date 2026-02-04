import { motion } from "framer-motion";
import { AptitudeArea } from "@/data/reportData";
import { cn } from "@/lib/utils";

interface AptitudeChartProps {
  areas: AptitudeArea[];
}

const getLevelColor = (level: AptitudeArea["level"]) => {
  switch (level) {
    case "strength":
      return "bg-secondary"; // Cooler tones for strengths
    case "developing":
      return "bg-primary";
    case "growth":
      return "bg-muted-foreground/40"; // Neutral tones for growth areas
  }
};

const getLevelLabel = (level: AptitudeArea["level"]) => {
  switch (level) {
    case "strength":
      return "Strength";
    case "developing":
      return "Developing";
    case "growth":
      return "Growth Area";
  }
};

export const AptitudeChart = ({ areas }: AptitudeChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <span className="text-xl">📊</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Aptitude Analysis</h3>
          <p className="text-sm text-muted-foreground">Your cognitive strengths and abilities</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-xs text-muted-foreground">Strength</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Developing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
          <span className="text-xs text-muted-foreground">Growth Area</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-5">
        {areas.map((area, index) => (
          <motion.div
            key={area.area}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">{area.area}</span>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  area.level === "strength" && "bg-secondary/20 text-secondary",
                  area.level === "developing" && "bg-primary/20 text-primary",
                  area.level === "growth" && "bg-muted text-muted-foreground"
                )}>
                  {getLevelLabel(area.level)}
                </span>
                <span className="text-sm font-semibold text-foreground">{area.score}%</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${area.score}%` }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                className={cn("h-full rounded-full", getLevelColor(area.level))}
              />
            </div>
            
            {/* Insight */}
            <p className="text-xs text-muted-foreground mt-2">{area.insight}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
