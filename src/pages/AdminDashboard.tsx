import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, CreditCard, UserPlus, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  referred_by: string | null;
  has_paid: boolean;
  created_at: string;
}

const ADMIN_EMAIL = "gurbaazsingh411@gmail.com";

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch all profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, referred_by, has_paid")
      .order("full_name", { ascending: true });

    if (!error && data) {
      setProfiles(data as Profile[]);
    }
    setLoading(false);
  };

  const totalUsers = profiles.length;
  const totalPaid = profiles.filter(p => p.has_paid).length;
  const totalRevenue = totalPaid * 50000; // Assuming Rs. 50,000 per user based on previous codebase

  // Group by referral code
  const referralStats: Record<string, { signups: number; paid: number }> = {};
  profiles.forEach((p) => {
    const code = p.referred_by || "Organic (No Code)";
    if (!referralStats[code]) {
      referralStats[code] = { signups: 0, paid: 0 };
    }
    referralStats[code].signups += 1;
    if (p.has_paid) referralStats[code].paid += 1;
  });

  const referralArray = Object.entries(referralStats).map(([code, stats]) => ({
    code,
    ...stats,
  })).sort((a, b) => b.signups - a.signups);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin & Sales Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track student registrations, payments, and sales executive performance.</p>
          </div>
          <Button onClick={fetchData} variant="outline" disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Top Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Students signed up</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Converted (Paid)</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPaid}</div>
              <p className="text-xs text-muted-foreground">Successfully purchased</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Based on current tracked payments</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral / Sales Exec Stats */}
          <Card className="col-span-1 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Sales Executive Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referral Code</TableHead>
                    <TableHead className="text-right">Signups</TableHead>
                    <TableHead className="text-right">Paid Conversions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralArray.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                        No referral data found
                      </TableCell>
                    </TableRow>
                  )}
                  {referralArray.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell className="font-medium">{row.code}</TableCell>
                      <TableCell className="text-right">{row.signups}</TableCell>
                      <TableCell className="text-right">{row.paid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* User Directory */}
          <Card className="col-span-1 shadow-md">
            <CardHeader>
              <CardTitle>Recent Student Directory</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                        No student data found
                      </TableCell>
                    </TableRow>
                  )}
                  {profiles.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium">{p.full_name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{p.email}</div>
                      </TableCell>
                      <TableCell>{p.referred_by || <span className="text-muted-foreground text-xs">Organic</span>}</TableCell>
                      <TableCell className="text-right">
                        {p.has_paid ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                            Unpaid
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </motion.div>
    </div>
  );
}
