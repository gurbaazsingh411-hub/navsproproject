export interface PersonalityTrait {
  trait: string;
  score: number;
  description: string;
}

export interface AptitudeArea {
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
  aptitudeAreas: AptitudeArea[];
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
  aptitudeAreas: [
    { area: "Logical Reasoning", score: 88, level: "strength", insight: "You excel at identifying patterns and solving complex problems." },
    { area: "Verbal Communication", score: 75, level: "developing", insight: "You express ideas clearly and are developing persuasive skills." },
    { area: "Numerical Analysis", score: 82, level: "strength", insight: "Numbers come naturally to you—a valuable skill in many fields." },
    { area: "Spatial Awareness", score: 65, level: "growth", insight: "With practice, you can strengthen visualization abilities." },
    { area: "Abstract Thinking", score: 79, level: "developing", insight: "You handle conceptual ideas well and connect different concepts." },
  ],
  interestAreas: [
    { name: "Technology & Innovation", score: 92, careers: ["Software Engineering", "Data Science", "Product Management"] },
    { name: "Business & Strategy", score: 78, careers: ["Consulting", "Entrepreneurship", "Finance"] },
    { name: "Science & Research", score: 71, careers: ["Research Analyst", "Biotechnology", "Environmental Science"] },
  ],
  readinessScore: 76,
  topStrengths: [
    "Strong analytical and problem-solving abilities",
    "Natural leadership qualities with collaborative mindset",
    "High attention to detail and precision",
  ],
  growthAreas: [
    "Spatial visualization for design-related tasks",
    "Building confidence in public speaking",
    "Expanding creative expression techniques",
  ],
  recommendedPaths: [
    "Technology & Engineering",
    "Business Analytics",
    "Research & Development",
  ],
};
import { AssessmentResults, DimensionScore } from "@/lib/scoringUtils";

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
    "Extroversion": band === "high" ? "You thrive in social settings and enjoy collaboration." : "You prefer thoughtful, independent work environments.",
    "Adaptability": band === "high" ? "You handle change easily and stay flexible." : "You prefer structured and predictable routines.",
    "Emotional Stability": band === "high" ? "You stay calm and composed under pressure." : "You feel things deeply and are sensitive to stress.",
    "Risk Taking": band === "high" ? "You are comfortable with uncertainty and bold choices." : "You prefer calculated and safe decisions.",
    "Independence": band === "high" ? "You excel when working autonomously." : "You value guidance and team support.",
    "Conscientiousness": band === "high" ? "You are highly organized and detail-oriented." : "You prefer a flexible and spontaneous approach."
  };
  return descriptions[trait] || "Trait description pending.";
};

const getAptitudeInsight = (area: string, band: string): string => {
  if (band === "high") return `High aptitude in ${area}, indicating a natural strength.`;
  if (band === "moderate") return `Moderate ability in ${area}, can be improved with practice.`;
  return `Developing area in ${area}, may require extra focus.`;
};


export const transformResultsToReportData = (results: AssessmentResults, studentName: string): ReportData => {
  const personalityTraits = results.personalitySummary.map(p => ({
    trait: p.name,
    score: Math.round(p.percentage),
    description: getTraitDescription(p.name, p.band)
  }));

  const aptitudeAreas = results.sections.find(s => s.sectionId === 'aptitude')?.dimensions.map(d => ({
    area: d.name,
    score: Math.round(d.percentage),
    level: d.band === 'high' ? 'strength' as const : d.band === 'moderate' ? 'developing' as const : 'growth' as const,
    insight: getAptitudeInsight(d.name, d.band)
  })) || [];

  const interestAreas = results.topInterests.map(i => ({
    name: i.name,
    score: Math.round(i.percentage),
    careers: CAREER_MAPPINGS[i.name] || []
  }));

  // Simple readiness score average of study + motivation
  const readinessScore = Math.round((results.studyStyleScore.percentage + results.motivationScore.percentage) / 2);

  const topStrengths = [
    ...results.strongAptitudes.map(a => `${a.name} proficiency`),
    results.studyStyleScore.band === 'high' ? "Consistent Study Habits" : null,
    results.motivationScore.band === 'high' ? "High Motivation" : null
  ].filter(Boolean) as string[];

  // Fill if empty
  if (topStrengths.length === 0) topStrengths.push("Developing Capabilities");

  const growthAreas = [
    results.studyStyleScore.band === 'low' ? "Study Discipline" : null,
    results.motivationScore.band === 'low' ? "Motivation Consistency" : null,
    ...results.sections.find(s => s.sectionId === 'aptitude')?.dimensions.filter(d => d.band === 'low').map(d => d.name) || []
  ].filter(Boolean) as string[];

  const recommendedPaths = results.topInterests.flatMap(i => CAREER_MAPPINGS[i.name]?.slice(0, 2) || []);

  return {
    studentName,
    assessmentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    personalityTraits,
    aptitudeAreas,
    interestAreas,
    readinessScore,
    topStrengths: topStrengths.slice(0, 5),
    growthAreas: growthAreas.slice(0, 3),
    recommendedPaths: [...new Set(recommendedPaths)].slice(0, 4)
  };
};
