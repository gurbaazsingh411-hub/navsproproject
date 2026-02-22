import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SettingsPage = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        reminders: true,
        updates: false,
    });

    const sections = [
        {
            icon: Bell,
            title: "Notifications",
            description: "Control how NAVSPRO communicates with you.",
            color: "bg-secondary/10 text-secondary",
            settings: [
                { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                { key: "reminders", label: "Assessment Reminders", desc: "Get reminded to complete your assessment" },
                { key: "updates", label: "Product Updates", desc: "News about new features" },
            ],
        },
    ];

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

                        {/* Notification Settings */}
                        {sections.map((section, si) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: si * 0.1 }}
                                className="bg-card rounded-2xl border border-border p-6 shadow-soft"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center`}>
                                        <section.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{section.title}</h3>
                                        <p className="text-xs text-muted-foreground">{section.description}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {section.settings.map((s) => (
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
                        ))}

                        {/* Coming soon sections */}
                        {[
                            { icon: Palette, title: "Appearance", desc: "Theme and display preferences", color: "bg-accent/10 text-accent" },
                            { icon: Shield, title: "Privacy & Security", desc: "Control your data and security settings", color: "bg-destructive/10 text-destructive" },
                            { icon: Globe, title: "Language & Region", desc: "Set your preferred language", color: "bg-primary/10 text-primary" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                className="bg-card rounded-2xl border border-border p-5 shadow-soft flex items-center gap-4 cursor-default opacity-60"
                            >
                                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Coming soon</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SettingsPage;
