import { motion } from "framer-motion";
import { DimensionScore } from "@/lib/scoringUtils";
import { ShieldCheck, Home, MapPin, Wallet, Zap, Users } from "lucide-react";

interface EnvironmentInsightsProps {
  insights: DimensionScore[];
}

const getIcon = (name: string) => {
  if (name.includes("Family")) return <Users className="w-4 h-4" />;
  if (name.includes("Financial")) return <Wallet className="w-4 h-4" />;
  if (name.includes("Reloc")) return <MapPin className="w-4 h-4" />;
  if (name.includes("prep")) return <Zap className="w-4 h-4" />;
  if (name.includes("Resour")) return <ShieldCheck className="w-4 h-4" />;
  return <Home className="w-4 h-4" />;
};

export const EnvironmentInsights = ({ insights }: EnvironmentInsightsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <span className="text-xl">🌍</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Environment & Context</h3>
          <p className="text-sm text-muted-foreground">External factors and support systems</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-muted-foreground border border-border">
                {getIcon(insight.name)}
              </div>
              <span className="text-sm font-medium text-foreground">{insight.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                insight.band === 'high' ? 'bg-emerald-500/10 text-emerald-600' :
                insight.band === 'moderate' ? 'bg-amber-500/10 text-amber-600' :
                'bg-rose-500/10 text-rose-600'
              }`}>
                {insight.band === 'high' ? 'Optimal' : insight.band === 'moderate' ? 'Support Needed' : 'Constraint'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
