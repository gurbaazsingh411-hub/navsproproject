import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Settings, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm the AI Assistant. Please set your Free Google Gemini API key in settings to start chatting!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setMessages([
        {
          id: "1",
          text: "Hi! I'm the NAVSPRO Assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, showSettings]);

  const saveApiKey = () => {
    if (apiKey.trim().length < 20) {
      toast.error("Please enter a valid Gemini API key");
      return;
    }
    localStorage.setItem("gemini_api_key", apiKey.trim());
    toast.success("API Key saved securely in your browser!");
    setShowSettings(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (!apiKey) {
      toast.error("Please configure your Gemini API Key first.");
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare chat history for Gemini
      const apiMessages = messages.filter(m => m.id !== "1").map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));
      
      apiMessages.push({ role: "user", parts: [{ text: userMessage.text }] });

      // Call Google Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are a helpful assistant for NAVSPRO, a career assessment platform." }]
          },
          contents: apiMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Gemini API. Check your API key.");
      }

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand that.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Oops! Something went wrong. Please check your API key or try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center p-0"
        >
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] shadow-xl rounded-2xl flex flex-col overflow-hidden"
          >
            <Card className="flex flex-col h-full border-0 rounded-none bg-background/95 backdrop-blur-md">
              <CardHeader className="bg-primary/10 border-b p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-md font-bold">NAVSPRO Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    className="rounded-full w-8 h-8 hover:bg-black/5"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full w-8 h-8 hover:bg-black/5"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              {showSettings ? (
                <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Key className="w-5 h-5" />
                      <h3 className="font-semibold text-lg">API Configuration</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a free API key from <strong>Google AI Studio</strong>. The free tier gives you 1,500 requests per day at no cost!
                    </p>
                    <div className="space-y-2">
                      <Input
                        type="password"
                        placeholder="AIzaSy..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button onClick={saveApiKey} className="w-full">
                      Save Key & Start Chatting
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
                      >
                        {msg.sender === "bot" && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-primary" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-muted text-foreground rounded-tl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-primary" />
                        </div>
                        <div className="px-3 py-2 rounded-2xl bg-muted text-foreground rounded-tl-sm text-sm flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>

                  <div className="p-3 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder={apiKey ? "Ask a question..." : "Please configure API Key first..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading || !apiKey}
                        className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-primary/50"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-full shrink-0"
                        disabled={!inputValue.trim() || isLoading || !apiKey}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
