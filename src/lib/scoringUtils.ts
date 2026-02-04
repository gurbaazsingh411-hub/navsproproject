// NAVSPRO Scoring Utilities
// Based on the Scoring Logic document

import {
    assessmentQuestions,
    assessmentSections,
    AssessmentSection,
    InterestArea,
    AptitudeArea,
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
    sectionId: AssessmentSection;
    sectionTitle: string;
    totalScore: number;
    maxScore: number;
    percentage: number;
    dimensions: DimensionScore[];
}

export interface AssessmentResults {
    sections: SectionScores[];
    topInterests: DimensionScore[];
    strongAptitudes: DimensionScore[];
    personalitySummary: DimensionScore[];
    studyStyleScore: DimensionScore;
    motivationScore: DimensionScore;
    environmentScore: DimensionScore;
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
    section: AssessmentSection,
    subsection: string
) => {
    return assessmentQuestions.filter(
        (q) => q.section === section && q.subsection === subsection
    );
};

/**
 * Get questions for a specific section
 */
const getQuestionsForSection = (section: AssessmentSection) => {
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
 * Calculate Aptitude scores
 */
export const calculateAptitudeScores = (
    answers: Record<number, number>
): DimensionScore[] => {
    const aptitudeAreas: AptitudeArea[] = [
        "logical",
        "numerical",
        "verbal",
        "spatial",
        "memory",
        "problemSolving",
    ];

    const areaNames: Record<AptitudeArea, string> = {
        logical: "Logical Reasoning",
        numerical: "Numerical Ability",
        verbal: "Verbal Ability",
        spatial: "Spatial Reasoning",
        memory: "Memory Retention",
        problemSolving: "Problem Solving",
    };

    return aptitudeAreas.map((area) => {
        const questions = getQuestionsForSubsection("aptitude", area);
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
 * Calculate Personality dimension scores
 */
export const calculatePersonalityScores = (
    answers: Record<number, number>
): DimensionScore[] => {
    const personalityDimensions: PersonalityDimension[] = [
        "extroversion",
        "adaptability",
        "emotionalStability",
        "riskTaking",
        "independence",
        "conscientiousness",
    ];

    const dimensionNames: Record<PersonalityDimension, string> = {
        extroversion: "Extroversion",
        adaptability: "Adaptability",
        emotionalStability: "Emotional Stability",
        riskTaking: "Risk Taking",
        independence: "Independence",
        conscientiousness: "Conscientiousness",
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
    section: AssessmentSection,
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

    // Calculate aptitude scores and get strong ones
    const aptitudeScores = calculateAptitudeScores(answers);
    const strongAptitudes = aptitudeScores.filter((a) => a.band === "high");

    // Calculate personality scores
    const personalityScores = calculatePersonalityScores(answers);

    // Calculate section-level scores
    const studyStyleData = calculateSectionScore("studyStyle", answers);
    const motivationData = calculateSectionScore("motivation", answers);
    const environmentData = calculateSectionScore("environment", answers);

    const studyStyleScore: DimensionScore = {
        name: "Study Style & Discipline",
        score: studyStyleData.score,
        maxScore: studyStyleData.maxScore,
        percentage: studyStyleData.percentage,
        band: getScoreBand(studyStyleData.percentage),
    };

    const motivationScore: DimensionScore = {
        name: "Motivation & Stress Handling",
        score: motivationData.score,
        maxScore: motivationData.maxScore,
        percentage: motivationData.percentage,
        band: getScoreBand(motivationData.percentage),
    };

    const environmentScore: DimensionScore = {
        name: "Environment & Constraints",
        score: environmentData.score,
        maxScore: environmentData.maxScore,
        percentage: environmentData.percentage,
        band: getScoreBand(environmentData.percentage),
    };

    // Build section scores
    const sections: SectionScores[] = assessmentSections.map((section) => {
        const sectionData = calculateSectionScore(section.id, answers);
        let dimensions: DimensionScore[] = [];

        switch (section.id) {
            case "interest":
                dimensions = interestScores;
                break;
            case "aptitude":
                dimensions = aptitudeScores;
                break;
            case "personality":
                dimensions = personalityScores;
                break;
            default:
                dimensions = [];
        }

        return {
            sectionId: section.id,
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
        strongAptitudes,
        personalitySummary: personalityScores,
        studyStyleScore,
        motivationScore,
        environmentScore,
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
