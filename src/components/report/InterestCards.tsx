import { motion } from "framer-motion";
import { InterestArea } from "@/data/reportData";
import { Briefcase, ChevronRight } from "lucide-react";

interface InterestCardsProps {
  interests: InterestArea[];
}

export const InterestCards = ({ interests }: InterestCardsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Interest Areas</h3>
          <p className="text-sm text-muted-foreground">Fields that align with your profile</p>
        </div>
      </div>

      <div className="space-y-4">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.15 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">{interest.name}</h4>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${interest.score}%` }}
                    transition={{ duration: 0.8, delay: 1 + index * 0.15 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
                <span className="text-sm font-semibold text-foreground">{interest.score}%</span>
              </div>
            </div>

            {/* Career suggestions */}
            <div className="flex flex-wrap gap-2">
              {interest.careers.map((career) => (
                <span
                  key={career}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background border border-border text-xs text-muted-foreground"
                >
                  <Briefcase className="w-3 h-3" />
                  {career}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore more */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border hover:border-primary/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Explore more career paths
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};
