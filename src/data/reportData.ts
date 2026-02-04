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
