import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Phone, MapPin, GraduationCap, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileFormProps {
    onComplete?: () => void;
    initialData?: any;
}

export function ProfileForm({ onComplete, initialData }: ProfileFormProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        grade: "",
        city_state: "",
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || "",
                full_name: user.user_metadata?.full_name || prev.full_name,
                ...initialData
            }));
        }
    }, [user, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    full_name: formData.full_name,
                    email: formData.email, // Keep email synced if needed, or just for record
                    phone: formData.phone,
                    grade: formData.grade,
                    city_state: formData.city_state,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;

            toast.success("Profile updated successfully!");
            if (onComplete) onComplete();
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-primary/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Complete Your Profile
                </CardTitle>
                <CardDescription>
                    Tell us a bit more about yourself to personalize your experience.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="John Doe"
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    value={formData.email}
                                    disabled
                                    className="pl-9 bg-muted/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 234 567 8900"
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade / Class</Label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="grade"
                                    value={formData.grade}
                                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                                    placeholder="10th Grade"
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="city_state">City & State</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="city_state"
                                    value={formData.city_state}
                                    onChange={e => setFormData({ ...formData, city_state: e.target.value })}
                                    placeholder="New York, NY"
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Profile"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
