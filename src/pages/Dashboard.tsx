import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { ProgressSnapshot } from "@/components/dashboard/ProgressSnapshot";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("assessments")
          .select("answers")
          .eq("user_id", user.id)
          .single();

        if (data && data.answers) {
          const answeredCount = Object.keys(data.answers).length;
          // 90 total questions
          const percent = Math.min(100, (answeredCount / 90) * 100);
          setProgress(percent);
        }
      } catch (e) {
        console.error("Error fetching dashboard data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Student";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <main className="flex-1 overflow-auto">
          {/* Header with trigger */}
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-4">
            <SidebarTrigger className="shrink-0" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <WelcomeBanner userName={userName} />

            <ProgressSnapshot progressPercentage={progress} />

            <div className="grid lg:grid-cols-2 gap-6">
              <TodaysFocus />
              {/* Messages section removed */}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
