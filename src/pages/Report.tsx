import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalityRadar } from "@/components/report/PersonalityRadar";
import { AptitudeChart } from "@/components/report/AptitudeChart";
import { ReadinessRing } from "@/components/report/ReadinessRing";
import { InterestCards } from "@/components/report/InterestCards";
import { InsightsSummary } from "@/components/report/InsightsSummary";
import { sampleReportData } from "@/data/reportData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { calculateAssessmentResults } from "@/lib/scoringUtils";
import { ReportData, transformResultsToReportData } from "@/data/reportData";

const Report = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming useAuth is available here based on other files
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessmentData = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("assessments")
          .select("answers")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;
        if (data && data.answers) {
          const results = calculateAssessmentResults(data.answers);
          // Use user metadata name or fallback
          const studentName = user.user_metadata?.full_name || "Student";
          const transformed = transformResultsToReportData(results, studentName);
          setReportData(transformed);
        }
      } catch (err) {
        console.error("Error loading report:", err);
        toast.error("Failed to load assessment results.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchAssessmentData();
    else if (!user) {
      // If accessing directly without auth, maybe redirect? 
      // For now, let's just let it load or show empty state.
      setIsLoading(false);
    }
  }, [user]);

  // Use reportData if available, otherwise fallback to sample ONLY if hardcoded (but here we want real)
  // Or show loading.
  const data = reportData || sampleReportData; // Fallback to sample for dev/preview if no data found

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);
    toast.info("Generating PDF report...");

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // For cross-origin images
        logging: false,
        backgroundColor: "#ffffff" // Ensure white background
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width
      const pageHeight = 297; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle multi-page content
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`NAVSPRO_Report_${data.studentName.replace(/\s+/g, "_")}.pdf`);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isGenerating ? "Generating..." : "Download PDF"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content - Wrapped in ref for capture */}
      <div ref={reportRef} className="bg-background">
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Report header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3"
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Personal Insights Report
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Hello, {data.studentName}
                </h1>
                <p className="text-muted-foreground">
                  Your personalized career discovery insights
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {data.assessmentDate}
              </div>
            </div>

            {/* Introduction card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border"
            >
              <p className="text-foreground leading-relaxed">
                This report is a snapshot of who you are today—your unique combination of personality traits,
                natural abilities, and interests. Think of it as a compass, not a destination.
                Use these insights to explore paths that align with your authentic self.
              </p>
            </motion.div>
          </motion.div>

          {/* Charts grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <PersonalityRadar traits={data.personalityTraits} />
            <AptitudeChart areas={data.aptitudeAreas} />
          </div>

          {/* Readiness and Interests */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <ReadinessRing score={data.readinessScore} />
            <InterestCards interests={data.interestAreas} />
          </div>

          {/* Summary section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-lg">
                ✨
              </span>
              What This Means For You
            </h2>
            <InsightsSummary
              strengths={data.topStrengths}
              growthAreas={data.growthAreas}
              recommendedPaths={data.recommendedPaths}
            />
          </motion.div>

          {/* CTA Section - Hide in PDF if possible, or keep it depending on requirement. Keeping it for now. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-border print:hidden" // Added print:hidden logic if needed later
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Take the Next Step?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Connect with a mentor who can help you explore these paths and create an actionable plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-html2canvas-ignore="true">
              <Button variant="hero" size="lg">
                Book a Mentor Session
              </Button>
              <Button variant="outline" size="lg">
                Explore Career Paths
              </Button>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            This report is a guide for self-discovery, not a definitive assessment.
            Your potential is unlimited, and this is just the beginning of your journey.
          </motion.p>
        </main>
      </div>
    </div>
  );
};

export default Report;
