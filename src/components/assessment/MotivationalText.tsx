import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, Zap, Trophy } from "lucide-react";

interface MotivationalTextProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

const getMotivationalContent = (progress: number, currentQuestion: number, totalQuestions: number) => {
  if (currentQuestion === 1) {
    return { text: "Let's discover what makes you unique!", icon: Sparkles };
  }
  if (progress < 25) {
    return { text: "Great start! Keep going.", icon: Star };
  }
  if (progress < 50) {
    return { text: "You're doing amazing!", icon: Heart };
  }
  if (progress < 75) {
    return { text: "Halfway there! You've got this.", icon: Zap };
  }
  if (progress < 90) {
    return { text: "Almost done! Just a few more.", icon: Trophy };
  }
  return { text: "Final stretch! You're incredible.", icon: Sparkles };
};

export const MotivationalText = ({ progress, currentQuestion, totalQuestions }: MotivationalTextProps) => {
  const { text, icon: Icon } = getMotivationalContent(progress, currentQuestion, totalQuestions);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-2 text-muted-foreground"
      >
        <Icon className="w-4 h-4 text-secondary" />
        <span className="text-sm font-medium">{text}</span>
      </motion.div>
    </AnimatePresence>
  );
};
