import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { motion } from "framer-motion";
import { Settings, Bell, Palette, Globe, ChevronRight, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const SettingsPage = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        reminders: true,
        updates: false,
    });

    // Dark mode: reads from <html> class and persists to localStorage
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored) return stored === "dark";
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <DashboardSidebar />

                <main className="flex-1 overflow-auto">
                    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-4">
                        <SidebarTrigger className="shrink-0" />
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-foreground">Settings</h1>
                        </div>
                    </header>

                    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Settings</h2>
                                    <p className="text-muted-foreground">Manage your account preferences.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Appearance — Dark Mode */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="bg-card rounded-2xl border border-border p-6 shadow-soft"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                                    <Palette className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Appearance</h3>
                                    <p className="text-xs text-muted-foreground">Theme and display preferences</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {isDark
                                        ? <Moon className="w-4 h-4 text-muted-foreground" />
                                        : <Sun className="w-4 h-4 text-muted-foreground" />
                                    }
                                    <div>
                                        <Label htmlFor="dark-mode" className="font-medium text-sm text-foreground">
                                            Dark Mode
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            {isDark ? "Switch to light theme" : "Switch to dark theme"}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    id="dark-mode"
                                    checked={isDark}
                                    onCheckedChange={setIsDark}
                                />
                            </div>
                        </motion.div>

                        {/* Notifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card rounded-2xl border border-border p-6 shadow-soft"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Notifications</h3>
                                    <p className="text-xs text-muted-foreground">Control how NAVSPRO communicates with you.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                                    { key: "reminders", label: "Assessment Reminders", desc: "Get reminded to complete your assessment" },
                                    { key: "updates", label: "Product Updates", desc: "News about new features" },
                                ].map((s) => (
                                    <div key={s.key} className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor={s.key} className="font-medium text-sm text-foreground">{s.label}</Label>
                                            <p className="text-xs text-muted-foreground">{s.desc}</p>
                                        </div>
                                        <Switch
                                            id={s.key}
                                            checked={notifications[s.key as keyof typeof notifications]}
                                            onCheckedChange={(val) => setNotifications(prev => ({ ...prev, [s.key]: val }))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Language & Region — coming soon */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-card rounded-2xl border border-border p-5 shadow-soft flex items-center gap-4 cursor-default opacity-60"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-foreground text-sm">Language &amp; Region</p>
                                <p className="text-xs text-muted-foreground">Set your preferred language</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Coming soon</span>
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SettingsPage;
