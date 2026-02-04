import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (data) setProfile(data);
            } catch (error) {
                console.error("Error loading profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <DashboardSidebar />

                <main className="flex-1 overflow-auto">
                    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-4">
                        <SidebarTrigger className="shrink-0" />
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-foreground">My Profile</h1>
                        </div>
                    </header>

                    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
                        {loading ? (
                            <div className="flex justify-center p-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
                                    <p className="text-muted-foreground">Manage your personal information and preferences.</p>
                                </div>

                                <ProfileForm initialData={profile} />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default Profile;
