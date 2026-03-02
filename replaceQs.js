const fs = require('fs');

const questions = [
    'I enjoy working with tools and machines.',
    'I like fixing mechanical or electrical problems.',
    'I prefer hands-on activities over desk work.',
    'I enjoy building or assembling things.',
    'I like working outdoors.',
    'I enjoy solving complex problems.',
    'I like researching how things work.',
    'I enjoy mathematics and logical reasoning.',
    'I like conducting experiments.',
    'I enjoy analyzing data and patterns.',
    'I enjoy creative writing or storytelling.',
    'I like drawing, music, or artistic expression.',
    'I enjoy thinking of new ideas.',
    'I prefer unstructured creative tasks.',
    'I enjoy design and aesthetics.',
    'I like helping people solve their problems.',
    'I enjoy teaching or guiding others.',
    'I feel satisfied when supporting someone emotionally.',
    'I like working in teams.',
    'I enjoy community service activities.',
    'I enjoy leading group activities.',
    'I like persuading others to my point of view.',
    'I am comfortable taking risks in business ideas.',
    'I enjoy starting new initiatives.',
    'I like competitive environments.',
    'I enjoy organizing files or information.',
    'I prefer structured routines.',
    'I like working with numbers and records.',
    'I follow rules carefully.',
    'I pay attention to small details.',
    'I enjoy trying new experiences.',
    'I am curious about many different topics.',
    'I appreciate art and beauty.',
    'I like exploring new ideas.',
    'I enjoy intellectual discussions.',
    'I complete tasks on time.',
    'I plan my work carefully.',
    'I am disciplined in my habits.',
    'I keep my workspace organized.',
    'I follow through on commitments.',
    'I feel energized around people.',
    'I enjoy social gatherings.',
    'I speak confidently in groups.',
    'I like meeting new people.',
    'I take initiative in conversations.',
    'I am considerate of others’ feelings.',
    'I cooperate easily in teams.',
    'I trust people easily.',
    'I avoid unnecessary conflicts.',
    'I am empathetic toward others.',
    'I often feel stressed or anxious.',
    'I worry about things frequently.',
    'I feel emotionally unstable at times.',
    'I get upset easily.',
    'I find it hard to stay calm under pressure.',
    'I finish whatever I begin.',
    'I am diligent and hardworking.',
    'I overcome setbacks to achieve goals.',
    'I stay committed to long-term goals.',
    'I keep working even when progress is slow.',
    'I maintain focus on important goals.',
    'I do not give up easily.',
    'I practice consistently to improve skills.',
    'I am resilient after failure.',
    'I persist through challenges.',
    'I stay motivated despite distractions.',
    'I continue efforts even without immediate rewards.',
    'I handle criticism constructively.',
    'I remain focused during long tasks.',
    'I recover quickly from disappointments.',
    'I set ambitious long-term goals.',
    'I am patient with difficult tasks.',
    'I value perseverance over talent.',
    'I stay disciplined toward personal growth.',
    'I consistently work toward improvement.',
    'I sleep at least 7 hours daily.',
    'I wake up feeling refreshed.',
    'I maintain consistent sleep timing.',
    'I limit screen time before sleeping.',
    'I manage my phone/social media usage well.',
    'I avoid excessive social media scrolling.',
    'I maintain healthy eating habits.',
    'I exercise regularly.',
    'My bowel movements are regular and comfortable.',
    'I do not experience frequent digestive discomfort.',
    'I stay hydrated daily.',
    'I manage stress effectively.',
    'I maintain daily productivity routines.',
    'I avoid late-night distractions.',
    'I maintain balance between study/work and rest.'
];

const sections = [
    { id: 'interest', title: 'Interest Assessment (RIASEC)', desc: 'Discover your natural interests and preferences', count: 30, subs: Array(5).fill('realistic').concat(Array(5).fill('investigative')).concat(Array(5).fill('artistic')).concat(Array(5).fill('social')).concat(Array(5).fill('enterprising')).concat(Array(5).fill('conventional')) },
    { id: 'personality', title: 'Personality (OCEAN)', desc: 'Explore your behavioral patterns and traits', count: 25, subs: Array(5).fill('openness').concat(Array(5).fill('conscientiousness')).concat(Array(5).fill('extraversion')).concat(Array(5).fill('agreeableness')).concat(Array(5).fill('neuroticism')) },
    { id: 'grit', title: 'GRIT & Perseverance', desc: 'Assess your drive and commitment to long-term goals', count: 20, subs: Array(20).fill('perseverance') },
    { id: 'lifestyle', title: 'Lifestyle Readiness Index', desc: 'Evaluate daily habits supporting academic success', count: 15, subs: Array(15).fill('habits') }
];

let qsOut = [];
let secOut = [];
let q_idx = 0;
for (const sec of sections) {
    secOut.push(`  {
    id: "${sec.id}",
    title: "${sec.title}",
    description: "${sec.desc}",
    questionCount: ${sec.count},
    startQuestion: ${q_idx + 1},
    endQuestion: ${q_idx + sec.count},
  },`);
    for (let i = 0; i < sec.count; i++) {
        const q = questions[q_idx];
        const sub = sec.subs[i];
        qsOut.push(`  { id: ${q_idx + 1}, section: "${sec.id}", subsection: "${sub}", question: "${q}" },`);
        q_idx++;
    }
}

const replacementContent = `// NAVSPRO Career Assessment - 90 Questions
// Based on the Student Assessment Master File

export type AssessmentSection = "interest" | "personality" | "grit" | "lifestyle";

export type InterestArea = "realistic" | "investigative" | "artistic" | "social" | "enterprising" | "conventional";

export type PersonalityDimension = "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism";

export interface AssessmentQuestion {
  id: number;
  section: AssessmentSection | string;
  subsection?: InterestArea | PersonalityDimension | string;
  question: string;
}

export interface AssessmentSectionInfo {
  id: AssessmentSection | string;
  title: string;
  description: string;
  questionCount: number;
  startQuestion: number;
  endQuestion: number;
}

export const assessmentSections: AssessmentSectionInfo[] = [
${secOut.join('\\n')}
];

export const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export const assessmentQuestions: AssessmentQuestion[] = [
${qsOut.join('\\n')}
];

// Helper function to get current section info based on question number
export const getCurrentSection = (questionNumber: number): AssessmentSectionInfo | undefined => {
  return assessmentSections.find(
    (section) => questionNumber >= section.startQuestion && questionNumber <= section.endQuestion
  );
};
`;

fs.writeFileSync('src/data/assessmentQuestions.ts', replacementContent.replace(/\\\\n/g, '\\n'));
console.log("Rewrite successful!");
