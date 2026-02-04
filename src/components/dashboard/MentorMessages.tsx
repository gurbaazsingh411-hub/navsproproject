import { motion } from "framer-motion";
import { MessageSquare, ChevronRight, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const messages = [
  {
    id: 1,
    mentor: {
      name: "Dr. Sarah Smith",
      role: "Career Counselor",
      avatar: "",
      initials: "SS",
    },
    preview: "Great progress on your assessments! I noticed your analytical scores have improved significantly. Let's discuss some new career paths that align with...",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    mentor: {
      name: "Prof. Michael Chen",
      role: "Academic Advisor",
      avatar: "",
      initials: "MC",
    },
    preview: "I've reviewed your interest inventory results. There are some exciting opportunities in the tech sector that match your profile. Would you like to schedule...",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    mentor: {
      name: "Ms. Emily Davis",
      role: "Skills Coach",
      avatar: "",
      initials: "ED",
    },
    preview: "Your leadership aptitude test shows remarkable potential. I'd recommend exploring some extracurricular activities that could help develop these skills further.",
    time: "2 days ago",
    unread: false,
  },
];

export function MentorMessages() {
  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center relative">
            <MessageSquare className="w-5 h-5 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Mentor Messages</h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-soft ${
              message.unread 
                ? "bg-primary/5 border-primary/20 hover:border-primary/40" 
                : "bg-muted/20 border-border hover:border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={message.mentor.avatar} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                  {message.mentor.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {message.mentor.name}
                  </p>
                  {message.unread && (
                    <Badge variant="secondary" className="bg-accent/20 text-accent text-xs px-1.5 py-0">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{message.mentor.role}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {message.time}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Button 
        className="w-full mt-4 bg-primary hover:bg-primary/90"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Contact a Mentor
      </Button>
    </motion.div>
  );
}
