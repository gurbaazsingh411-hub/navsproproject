import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { likertOptions } from "@/data/assessmentQuestions";

interface QuestionCardProps {
  question: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
  sectionTitle?: string;
}

export const QuestionCard = ({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
  sectionTitle,
}: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Section title */}
      {sectionTitle && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
            {sectionTitle}
          </span>
        </motion.div>
      )}

      {/* Question number badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-center"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
      </motion.div>

      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl font-semibold text-foreground text-center mb-10 leading-relaxed"
      >
        {question}
      </motion.h2>

      {/* Likert Scale Options */}
      <div className="space-y-3">
        {likertOptions.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => onSelect(option.value)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
              "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              selectedValue === option.value
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              {/* Selection indicator */}
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                  selectedValue === option.value
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}
              >
                {selectedValue === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary-foreground"
                  />
                )}
              </div>
              {/* Value indicator */}
              <span
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                  selectedValue === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {option.value}
              </span>
              {/* Option text */}
              <span
                className={cn(
                  "text-base font-medium transition-colors duration-300",
                  selectedValue === option.value
                    ? "text-primary"
                    : "text-foreground"
                )}
              >
                {option.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
