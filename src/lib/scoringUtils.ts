// NAVSPRO Scoring Utilities
// Based on the new Student Assessment Master File logic

import {
    assessmentQuestions,
    assessmentSections,
    AssessmentSection,
    InterestArea,
    PersonalityDimension,
} from "@/data/assessmentQuestions";

export type ScoreBand = "low" | "moderate" | "high";

export interface DimensionScore {
    name: string;
    score: number;
    maxScore: number;
    percentage: number;
    band: ScoreBand;
}

export interface SectionScores {
    sectionId: string;
    sectionTitle: string;
    totalScore: number;
    maxScore: number;
    percentage: number;
    dimensions: DimensionScore[];
}

export interface AssessmentResults {
    sections: SectionScores[];
    topInterests: DimensionScore[];
    personalitySummary: DimensionScore[];
    gritScore?: DimensionScore;
    lifestyleScore?: DimensionScore;
}

// Score band thresholds (as percentages)
const BAND_THRESHOLDS = {
    low: 40,      // Below 40%
    moderate: 70, // 40-70%
    high: 100,    // Above 70%
};

/**
 * Determine the score band based on percentage
 */
export const getScoreBand = (percentage: number): ScoreBand => {
    if (percentage < BAND_THRESHOLDS.low) return "low";
    if (percentage < BAND_THRESHOLDS.moderate) return "moderate";
    return "high";
};

/**
 * Get questions for a specific subsection
 */
const getQuestionsForSubsection = (
    section: string,
    subsection: string
) => {
    return assessmentQuestions.filter(
        (q) => q.section === section && q.subsection === subsection
    );
};

/**
 * Get questions for a specific section
 */
const getQuestionsForSection = (section: string) => {
    return assessmentQuestions.filter((q) => q.section === section);
};

/**
 * Calculate score for a set of question IDs
 */
const calculateScore = (
    questionIds: number[],
    answers: Record<number, number>
): { score: number; maxScore: number } => {
    let score = 0;
    let answered = 0;

    questionIds.forEach((id) => {
        if (answers[id] !== undefined) {
            score += answers[id];
            answered++;
        }
    });

    const maxScore = questionIds.length * 5; // 5 is max per question
    return { score, maxScore };
};

/**
 * Calculate Interest Assessment scores (RIASEC)
 */
export const calculateInterestScores = (
    answers: Record<number, number>
): DimensionScore[] => {
    const interestAreas: InterestArea[] = [
        "realistic",
        "investigative",
        "artistic",
        "social",
        "enterprising",
        "conventional",
    ];

    const areaNames: Record<InterestArea, string> = {
        realistic: "Realistic (Hands-on)",
        investigative: "Investigative (Research)",
        artistic: "Artistic (Creative)",
        social: "Social (Helping)",
        enterprising: "Enterprising (Leadership)",
        conventional: "Conventional (Organized)",
    };

    return interestAreas.map((area) => {
        const questions = getQuestionsForSubsection("interest", area);
        const questionIds = questions.map((q) => q.id);
        const { score, maxScore } = calculateScore(questionIds, answers);
        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

        return {
            name: areaNames[area],
            score,
            maxScore,
            percentage,
            band: getScoreBand(percentage),
        };
    });
};

/**
 * Calculate Personality dimension scores (OCEAN)
 */
export const calculatePersonalityScores = (
    answers: Record<number, number>
): DimensionScore[] => {
    const personalityDimensions: PersonalityDimension[] = [
        "openness",
        "conscientiousness",
        "extraversion",
        "agreeableness",
        "neuroticism",
    ];

    const dimensionNames: Record<PersonalityDimension, string> = {
        openness: "Openness",
        conscientiousness: "Conscientiousness",
        extraversion: "Extraversion",
        agreeableness: "Agreeableness",
        neuroticism: "Neuroticism",
    };

    return personalityDimensions.map((dimension) => {
        const questions = getQuestionsForSubsection("personality", dimension);
        const questionIds = questions.map((q) => q.id);
        const { score, maxScore } = calculateScore(questionIds, answers);
        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

        return {
            name: dimensionNames[dimension],
            score,
            maxScore,
            percentage,
            band: getScoreBand(percentage),
        };
    });
};

/**
 * Calculate section aggregate score
 */
export const calculateSectionScore = (
    section: string,
    answers: Record<number, number>
): { score: number; maxScore: number; percentage: number } => {
    const questions = getQuestionsForSection(section);
    const questionIds = questions.map((q) => q.id);
    const { score, maxScore } = calculateScore(questionIds, answers);
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

    return { score, maxScore, percentage };
};

/**
 * Calculate full assessment results
 */
export const calculateAssessmentResults = (
    answers: Record<number, number>
): AssessmentResults => {
    // Calculate interest scores and get top 2
    const interestScores = calculateInterestScores(answers);
    const topInterests = [...interestScores]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 2);

    // Calculate personality scores
    const personalityScores = calculatePersonalityScores(answers);

    // Calculate section-level scores for grit and lifestyle
    const gritData = calculateSectionScore("grit", answers);
    const lifestyleData = calculateSectionScore("lifestyle", answers);

    const gritScore: DimensionScore = {
        name: "GRIT & Perseverance",
        score: gritData.score,
        maxScore: gritData.maxScore,
        percentage: gritData.percentage,
        band: getScoreBand(gritData.percentage),
    };

    const lifestyleScore: DimensionScore = {
        name: "Lifestyle Readiness",
        score: lifestyleData.score,
        maxScore: lifestyleData.maxScore,
        percentage: lifestyleData.percentage,
        band: getScoreBand(lifestyleData.percentage),
    };

    // Build section scores
    const sections: SectionScores[] = assessmentSections.map((section) => {
        const sectionData = calculateSectionScore(section.id as string, answers);
        let dimensions: DimensionScore[] = [];

        switch (section.id) {
            case "interest":
                dimensions = interestScores;
                break;
            case "personality":
                dimensions = personalityScores;
                break;
            case "grit":
                dimensions = [gritScore];
                break;
            case "lifestyle":
                dimensions = [lifestyleScore];
                break;
            default:
                dimensions = [];
        }

        return {
            sectionId: section.id as string,
            sectionTitle: section.title,
            totalScore: sectionData.score,
            maxScore: sectionData.maxScore,
            percentage: sectionData.percentage,
            dimensions,
        };
    });

    return {
        sections,
        topInterests,
        personalitySummary: personalityScores,
        gritScore,
        lifestyleScore,
    };
};

/**
 * Get interpretation text based on score band
 */
export const getBandInterpretation = (band: ScoreBand): string => {
    switch (band) {
        case "low":
            return "Needs support or not a natural strength";
        case "moderate":
            return "Can perform well with guidance";
        case "high":
            return "Natural inclination or strength";
    }
};
