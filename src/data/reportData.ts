import { AssessmentResults, DimensionScore } from "@/lib/scoringUtils";

export interface PersonalityTrait {
  trait: string;
  score: number;
  description: string;
}

export interface CoreMetric {
  area: string;
  score: number;
  level: "strength" | "developing" | "growth";
  insight: string;
}

export interface InterestArea {
  name: string;
  score: number;
  careers: string[];
}

export interface ReportData {
  studentName: string;
  assessmentDate: string;
  personalityTraits: PersonalityTrait[];
  coreMetrics: CoreMetric[];
  interestAreas: InterestArea[];
  readinessScore: number;
  topStrengths: string[];
  growthAreas: string[];
  recommendedPaths: string[];
}

export const sampleReportData: ReportData = {
  studentName: "Alex Johnson",
  assessmentDate: "February 3, 2026",
  personalityTraits: [
    { trait: "Analytical", score: 85, description: "You approach problems methodically and enjoy finding logical solutions." },
    { trait: "Creative", score: 72, description: "You bring fresh perspectives and enjoy thinking outside the box." },
    { trait: "Social", score: 68, description: "You work well with others and value collaborative environments." },
    { trait: "Leadership", score: 78, description: "You naturally guide others and take initiative in group settings." },
    { trait: "Detail-Oriented", score: 81, description: "You notice the small things and value precision in your work." },
    { trait: "Adaptable", score: 74, description: "You handle change well and stay flexible in new situations." },
  ],
  coreMetrics: [
    { area: "GRIT & Perseverance", score: 88, level: "strength", insight: "You possess remarkable determination and stay focused on long-term goals." },
    { area: "Lifestyle Readiness", score: 75, level: "developing", insight: "Solid basic habits, but some areas of your daily routine could be further optimized." }
  ],
  interestAreas: [
    { name: "Technology & Innovation", score: 92, careers: ["Software Engineering", "Data Science", "Product Management"] },
    { name: "Business & Strategy", score: 78, careers: ["Consulting", "Entrepreneurship", "Finance"] },
    { name: "Science & Research", score: 71, careers: ["Research Analyst", "Biotechnology", "Environmental Science"] },
  ],
  readinessScore: 76,
  topStrengths: [
    "High perseverance toward goals",
    "Natural leadership qualities with collaborative mindset",
    "High attention to detail and precision",
  ],
  growthAreas: [
    "Improving sleep and screen time habits",
    "Building confidence in public speaking",
    "Expanding creative expression techniques",
  ],
  recommendedPaths: [
    "Technology & Engineering",
    "Business Analytics",
    "Research & Development",
  ],
};

export const CAREER_MAPPINGS: Record<string, string[]> = {
  "Realistic (Hands-on)": ["Engineering", "Architecture", "Construction Management", "Forestry", "Piloting"],
  "Investigative (Research)": ["Data Science", "Medicine", "Research Science", "Psychology", "Software Development"],
  "Artistic (Creative)": ["Graphic Design", "Writing/Journalism", "Fine Arts", "Music/Performance", "Marketing"],
  "Social (Helping)": ["Teaching", "Counseling", "Nursing", "Social Work", "Human Resources"],
  "Enterprising (Leadership)": ["Business Management", "Sales/Marketing", "Law", "Politics", "Entrepreneurship"],
  "Conventional (Organized)": ["Accounting", "Data Analysis", "Office Management", "Library Science", "Logistics"]
};

const getTraitDescription = (trait: string, band: string): string => {
  const descriptions: Record<string, string> = {
    "Openness": band === "high" ? "You are highly curious, imaginative, and open to trying new things." : "You prefer familiar routines and practical, straightforward ideas.",
    "Conscientiousness": band === "high" ? "You are highly organized, disciplined, and focused on your goals." : "You prefer a spontaneous and flexible approach rather than strict planning.",
    "Extraversion": band === "high" ? "You thrive in social settings, draw energy from others, and speak up easily." : "You draw energy from quiet time, preferring deep, independent work.",
    "Agreeableness": band === "high" ? "You are deeply cooperative, empathetic, and value team harmony." : "You are independent-minded and comfortable prioritizing logic over harmony.",
    "Neuroticism": band === "high" ? "You experience stress deeply and may worry frequently." : "You are emotionally resilient and handle high-pressure situations calmly."
  };
  return descriptions[trait] || "Trait description pending.";
};

const getCoreInsight = (area: string, band: string): string => {
  if (band === "high") return area === "GRIT & Perseverance" ? "Exceptional resilience and drive to achieve long-term goals." : "Excellent daily habits and routines that heavily support your success.";
  if (band === "moderate") return area === "GRIT & Perseverance" ? "Good determination, though you may sometimes struggle when progress is slow." : "Decent daily routines with some room for optimizing sleep, diet, or screen time.";
  return area === "GRIT & Perseverance" ? "You easily get distracted or discouraged. Building resilience will be key." : "Your daily lifestyle habits significantly hinder your potential and need urgent adjustment.";
};


export const transformResultsToReportData = (results: AssessmentResults, studentName: string): ReportData => {
  const personalityTraits = results.personalitySummary.map(p => ({
    trait: p.name,
    score: Math.round(p.percentage),
    description: getTraitDescription(p.name, p.band)
  }));

  const coreMetrics: CoreMetric[] = [];
  if (results.gritScore) {
    coreMetrics.push({
      area: results.gritScore.name,
      score: Math.round(results.gritScore.percentage),
      level: results.gritScore.band === 'high' ? 'strength' : results.gritScore.band === 'moderate' ? 'developing' : 'growth',
      insight: getCoreInsight(results.gritScore.name, results.gritScore.band)
    });
  }
  if (results.lifestyleScore) {
    coreMetrics.push({
      area: results.lifestyleScore.name,
      score: Math.round(results.lifestyleScore.percentage),
      level: results.lifestyleScore.band === 'high' ? 'strength' : results.lifestyleScore.band === 'moderate' ? 'developing' : 'growth',
      insight: getCoreInsight(results.lifestyleScore.name, results.lifestyleScore.band)
    });
  }


  const interestAreas = results.topInterests.map(i => ({
    name: i.name,
    score: Math.round(i.percentage),
    careers: CAREER_MAPPINGS[i.name] || []
  }));

  // Simple readiness score average of GRIT + Lifestyle
  let rScore = 0;
  if (results.gritScore && results.lifestyleScore) {
    rScore = Math.round((results.gritScore.percentage + results.lifestyleScore.percentage) / 2);
  } else {
    rScore = 50;
  }
  const readinessScore = rScore;

  const topStrengths = [
    results.gritScore?.band === 'high' ? "Exceptional Perseverance (GRIT)" : null,
    results.lifestyleScore?.band === 'high' ? "Strong Healthy Habits" : null,
    ...personalityTraits.filter(p => p.score > 75).map(p => `Strong ${p.trait}`),
  ].filter(Boolean) as string[];

  // Fill if empty
  if (topStrengths.length === 0) topStrengths.push("Developing Capabilities");

  const growthAreas = [
    results.gritScore?.band === 'low' ? "Building Long-term Resilience" : null,
    results.lifestyleScore?.band === 'low' ? "Improving Daily Health Habits" : null,
    ...personalityTraits.filter(p => p.score < 40).map(p => `Developing ${p.trait}`)
  ].filter(Boolean) as string[];

  const recommendedPaths = results.topInterests.flatMap(i => CAREER_MAPPINGS[i.name]?.slice(0, 2) || []);

  return {
    studentName,
    assessmentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    personalityTraits,
    coreMetrics,
    interestAreas,
    readinessScore,
    topStrengths: topStrengths.slice(0, 5),
    growthAreas: growthAreas.slice(0, 3),
    recommendedPaths: [...new Set(recommendedPaths)].slice(0, 4)
  };
};
