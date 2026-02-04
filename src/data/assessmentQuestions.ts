// NAVSPRO Career Assessment - 90 Questions
// Based on the Student Assessment Master File

export type AssessmentSection =
  | "interest"
  | "aptitude"
  | "personality"
  | "studyStyle"
  | "motivation"
  | "environment";

export type InterestArea =
  | "realistic"      // R - Working with tools/machines/physical objects
  | "investigative"  // I - Research/analysis/problem-solving
  | "artistic"       // A - Creative expression
  | "social"         // S - Helping others
  | "enterprising"   // E - Leadership/business
  | "conventional";  // C - Organization/structure

export type AptitudeArea =
  | "logical"        // Logical reasoning
  | "numerical"      // Numerical ability
  | "verbal"         // Verbal ability
  | "spatial"        // Spatial reasoning
  | "memory"         // Memory retention
  | "problemSolving"; // Problem-solving

export type PersonalityDimension =
  | "extroversion"
  | "adaptability"
  | "emotionalStability"
  | "riskTaking"
  | "independence"
  | "conscientiousness";

export interface AssessmentQuestion {
  id: number;
  section: AssessmentSection;
  subsection?: InterestArea | AptitudeArea | PersonalityDimension | string;
  question: string;
}

export interface AssessmentSectionInfo {
  id: AssessmentSection;
  title: string;
  description: string;
  questionCount: number;
  startQuestion: number;
  endQuestion: number;
}

export const assessmentSections: AssessmentSectionInfo[] = [
  {
    id: "interest",
    title: "Interest Assessment",
    description: "Discover your natural interests and preferences",
    questionCount: 24,
    startQuestion: 1,
    endQuestion: 24,
  },
  {
    id: "aptitude",
    title: "Aptitude Tendencies",
    description: "Understand your natural abilities and strengths",
    questionCount: 18,
    startQuestion: 25,
    endQuestion: 42,
  },
  {
    id: "personality",
    title: "Personality",
    description: "Explore your behavioral patterns and traits",
    questionCount: 18,
    startQuestion: 43,
    endQuestion: 60,
  },
  {
    id: "studyStyle",
    title: "Study Style & Discipline",
    description: "Evaluate your study habits and academic approach",
    questionCount: 12,
    startQuestion: 61,
    endQuestion: 72,
  },
  {
    id: "motivation",
    title: "Motivation & Stress Handling",
    description: "Assess your drive and resilience",
    questionCount: 10,
    startQuestion: 73,
    endQuestion: 82,
  },
  {
    id: "environment",
    title: "Environment & Constraints",
    description: "Consider your support system and circumstances",
    questionCount: 8,
    startQuestion: 83,
    endQuestion: 90,
  },
];

export const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  // ========================================
  // PART 1: INTEREST ASSESSMENT (Q1-24)
  // 6 RIASEC areas, 4 questions each
  // ========================================

  // Realistic (R) - Q1-4
  { id: 1, section: "interest", subsection: "realistic", question: "I enjoy working with tools, machines, or physical objects." },
  { id: 2, section: "interest", subsection: "realistic", question: "I prefer learning by doing rather than only reading or listening." },
  { id: 3, section: "interest", subsection: "realistic", question: "Outdoor or field-based work feels more interesting than desk work." },
  { id: 4, section: "interest", subsection: "realistic", question: "I feel satisfied when I can see the physical result of my work." },

  // Investigative (I) - Q5-8
  { id: 5, section: "interest", subsection: "investigative", question: "I enjoy understanding how things work at a deeper level." },
  { id: 6, section: "interest", subsection: "investigative", question: "I like solving complex problems even if they take time." },
  { id: 7, section: "interest", subsection: "investigative", question: "Subjects like science, maths, or research-based topics interest me." },
  { id: 8, section: "interest", subsection: "investigative", question: "I ask why and how questions more than others around me." },

  // Artistic (A) - Q9-12
  { id: 9, section: "interest", subsection: "artistic", question: "I enjoy expressing myself through art, writing, music, or design." },
  { id: 10, section: "interest", subsection: "artistic", question: "I dislike rigid rules when working on creative tasks." },
  { id: 11, section: "interest", subsection: "artistic", question: "I often think of unique or different ways to do things." },
  { id: 12, section: "interest", subsection: "artistic", question: "I feel motivated when I can use imagination in my work." },

  // Social (S) - Q13-16
  { id: 13, section: "interest", subsection: "social", question: "I enjoy helping others solve their problems." },
  { id: 14, section: "interest", subsection: "social", question: "I feel comfortable explaining things to classmates or friends." },
  { id: 15, section: "interest", subsection: "social", question: "I feel satisfied when my work positively impacts people." },
  { id: 16, section: "interest", subsection: "social", question: "I prefer working with people rather than working alone all the time." },

  // Enterprising (E) - Q17-20
  { id: 17, section: "interest", subsection: "enterprising", question: "I like taking initiative and leading group activities." },
  { id: 18, section: "interest", subsection: "enterprising", question: "I feel confident convincing others about my ideas." },
  { id: 19, section: "interest", subsection: "enterprising", question: "I am interested in business, management, or leadership roles." },
  { id: 20, section: "interest", subsection: "enterprising", question: "I enjoy taking responsibility for decisions." },

  // Conventional (C) - Q21-24
  { id: 21, section: "interest", subsection: "conventional", question: "I like working in a structured and well-organized environment." },
  { id: 22, section: "interest", subsection: "conventional", question: "I feel comfortable following clear instructions and procedures." },
  { id: 23, section: "interest", subsection: "conventional", question: "I enjoy tasks that involve planning, organizing, or record-keeping." },
  { id: 24, section: "interest", subsection: "conventional", question: "Accuracy and correctness are more important to me than creativity." },

  // ========================================
  // PART 2: APTITUDE TENDENCIES (Q25-42)
  // 6 aptitude areas, 3 questions each
  // ========================================

  // Logical Reasoning - Q25-27
  { id: 25, section: "aptitude", subsection: "logical", question: "I can identify patterns or connections between ideas quickly." },
  { id: 26, section: "aptitude", subsection: "logical", question: "I enjoy puzzles or problems that require logical thinking." },
  { id: 27, section: "aptitude", subsection: "logical", question: "I can break a big problem into smaller steps easily." },

  // Numerical Ability - Q28-30
  { id: 28, section: "aptitude", subsection: "numerical", question: "I feel comfortable working with numbers and calculations." },
  { id: 29, section: "aptitude", subsection: "numerical", question: "I can quickly estimate or calculate things in daily life." },
  { id: 30, section: "aptitude", subsection: "numerical", question: "Subjects involving numbers do not scare me." },

  // Verbal Ability - Q31-33
  { id: 31, section: "aptitude", subsection: "verbal", question: "I can clearly express my thoughts in words." },
  { id: 32, section: "aptitude", subsection: "verbal", question: "I understand what I read without much difficulty." },
  { id: 33, section: "aptitude", subsection: "verbal", question: "I feel confident participating in discussions or debates." },

  // Spatial Reasoning - Q34-36
  { id: 34, section: "aptitude", subsection: "spatial", question: "I can easily understand diagrams, maps, or layouts." },
  { id: 35, section: "aptitude", subsection: "spatial", question: "I am good at assembling, fixing, or building things." },
  { id: 36, section: "aptitude", subsection: "spatial", question: "I can imagine how an object will look from different angles." },

  // Memory - Q37-39
  { id: 37, section: "aptitude", subsection: "memory", question: "I can remember information for exams once I understand it." },
  { id: 38, section: "aptitude", subsection: "memory", question: "I can recall what I studied even after some time." },
  { id: 39, section: "aptitude", subsection: "memory", question: "I remember instructions or steps without repeated reminders." },

  // Problem Solving - Q40-42
  { id: 40, section: "aptitude", subsection: "problemSolving", question: "I stay calm and try different approaches when a solution does not work." },
  { id: 41, section: "aptitude", subsection: "problemSolving", question: "I enjoy challenges that make me think deeply." },
  { id: 42, section: "aptitude", subsection: "problemSolving", question: "I can apply what I learn to real-life situations." },

  // ========================================
  // PART 3: PERSONALITY (Q43-60)
  // 6 behavioral dimensions, 3 questions each
  // ========================================

  // Extroversion - Q43-45
  { id: 43, section: "personality", subsection: "extroversion", question: "I feel energized after interacting with people for a long time." },
  { id: 44, section: "personality", subsection: "extroversion", question: "I prefer discussing ideas with others rather than thinking alone." },
  { id: 45, section: "personality", subsection: "extroversion", question: "I feel comfortable expressing my opinions in a group." },

  // Adaptability - Q46-48
  { id: 46, section: "personality", subsection: "adaptability", question: "I like having a fixed routine for my studies and daily activities." },
  { id: 47, section: "personality", subsection: "adaptability", question: "Sudden changes in plans do not disturb me much." },
  { id: 48, section: "personality", subsection: "adaptability", question: "I can adjust quickly when things do not go as planned." },

  // Emotional Stability - Q49-51
  { id: 49, section: "personality", subsection: "emotionalStability", question: "I remain calm even when I am under pressure." },
  { id: 50, section: "personality", subsection: "emotionalStability", question: "Failures or mistakes do not discourage me for long." },
  { id: 51, section: "personality", subsection: "emotionalStability", question: "I can manage my emotions during stressful situations." },

  // Risk Taking - Q52-54
  { id: 52, section: "personality", subsection: "riskTaking", question: "I am willing to try new things even if success is not guaranteed." },
  { id: 53, section: "personality", subsection: "riskTaking", question: "I am comfortable taking calculated risks." },
  { id: 54, section: "personality", subsection: "riskTaking", question: "Fear of failure does not stop me from attempting something new." },

  // Independence - Q55-57
  { id: 55, section: "personality", subsection: "independence", question: "I can take responsibility for my decisions." },
  { id: 56, section: "personality", subsection: "independence", question: "I prefer solving my problems on my own before seeking help." },
  { id: 57, section: "personality", subsection: "independence", question: "I stay motivated even when no one is supervising me." },

  // Conscientiousness - Q58-60
  { id: 58, section: "personality", subsection: "conscientiousness", question: "I complete my tasks even when they feel boring or difficult." },
  { id: 59, section: "personality", subsection: "conscientiousness", question: "I pay attention to details in my work." },
  { id: 60, section: "personality", subsection: "conscientiousness", question: "I try to improve myself when I receive feedback." },

  // ========================================
  // PART 4: STUDY STYLE & DISCIPLINE (Q61-72)
  // 12 questions
  // ========================================
  { id: 61, section: "studyStyle", subsection: "focus", question: "I am able to concentrate on my studies without getting distracted easily." },
  { id: 62, section: "studyStyle", subsection: "focus", question: "I can study the same subject continuously for at least 45 minutes." },
  { id: 63, section: "studyStyle", subsection: "consistency", question: "I complete my homework and assignments on time." },
  { id: 64, section: "studyStyle", subsection: "consistency", question: "I revise my lessons regularly, not only before exams." },
  { id: 65, section: "studyStyle", subsection: "planning", question: "I am able to manage my time well between studies and other activities." },
  { id: 66, section: "studyStyle", subsection: "planning", question: "I usually plan what I need to study in advance." },
  { id: 67, section: "studyStyle", subsection: "examReadiness", question: "I feel confident about preparing for exams." },
  { id: 68, section: "studyStyle", subsection: "examReadiness", question: "I can handle academic pressure during exams." },
  { id: 69, section: "studyStyle", subsection: "perseverance", question: "I continue studying even when the syllabus feels difficult." },
  { id: 70, section: "studyStyle", subsection: "perseverance", question: "I am consistent with my study routine." },
  { id: 71, section: "studyStyle", subsection: "accountability", question: "I take responsibility for my academic performance." },
  { id: 72, section: "studyStyle", subsection: "accountability", question: "I am willing to improve my study habits if guided properly." },

  // ========================================
  // PART 5: MOTIVATION & STRESS HANDLING (Q73-82)
  // 10 questions
  // ========================================
  { id: 73, section: "motivation", subsection: "drive", question: "I feel motivated to work hard for my future goals." },
  { id: 74, section: "motivation", subsection: "drive", question: "I have a clear idea of what I want to achieve in life." },
  { id: 75, section: "motivation", subsection: "persistence", question: "Even when results are slow, I continue putting in effort." },
  { id: 76, section: "motivation", subsection: "persistence", question: "I do not give up easily when faced with difficulties." },
  { id: 77, section: "motivation", subsection: "stressManagement", question: "I am able to stay positive during stressful academic situations." },
  { id: 78, section: "motivation", subsection: "stressManagement", question: "I can manage pressure without panicking." },
  { id: 79, section: "motivation", subsection: "resilience", question: "I recover quickly after a setback or failure." },
  { id: 80, section: "motivation", subsection: "openness", question: "I am open to guidance and mentoring when I feel stuck." },
  { id: 81, section: "motivation", subsection: "growthMindset", question: "I believe consistent effort can improve my abilities." },
  { id: 82, section: "motivation", subsection: "growthMindset", question: "I feel confident that I can shape my own future." },

  // ========================================
  // PART 6: ENVIRONMENT & CONSTRAINTS (Q83-90)
  // 8 questions
  // ========================================
  { id: 83, section: "environment", subsection: "familySupport", question: "My family supports my education and career goals." },
  { id: 84, section: "environment", subsection: "familySupport", question: "My family is open to different career options, not only traditional ones." },
  { id: 85, section: "environment", subsection: "financial", question: "My family can support higher education if required." },
  { id: 86, section: "environment", subsection: "mobility", question: "I am willing to move to another city or place for better opportunities." },
  { id: 87, section: "environment", subsection: "preparation", question: "I am comfortable with long-term preparation for competitive exams." },
  { id: 88, section: "environment", subsection: "resources", question: "I have access to guidance, coaching, or mentorship when needed." },
  { id: 89, section: "environment", subsection: "homeEnvironment", question: "My daily responsibilities at home do not heavily disturb my studies." },
  { id: 90, section: "environment", subsection: "homeEnvironment", question: "I feel my environment allows me to focus on building my future." },
];

// Helper function to get current section info based on question number
export const getCurrentSection = (questionNumber: number): AssessmentSectionInfo | undefined => {
  return assessmentSections.find(
    (section) => questionNumber >= section.startQuestion && questionNumber <= section.endQuestion
  );
};
