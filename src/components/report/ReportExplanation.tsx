import { motion } from "framer-motion";

export const ReportExplanation = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-card rounded-2xl border border-border p-8 shadow-soft print:shadow-none print:border-none print:p-0"
        >
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Understanding Your Assessment
            </h2>

            <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
                <p>
                    The NAVSPro Career Fit Assessment is a scientifically structured self-discovery exercise designed to help students better understand their interests, personality traits, perseverance levels, and lifestyle readiness. This assessment combines internationally recognized psychological frameworks such as career interest profiling (RIASEC model), personality dimensions (OCEAN model), grit and perseverance measurement, and daily lifestyle habits. Together, these factors provide a holistic view of a student's natural strengths, behavioural tendencies, and growth areas.
                </p>
                <p>
                    It is important to understand that this assessment does not label or limit a student. Instead, it highlights patterns — areas where a student may naturally feel motivated, engaged, and capable of long-term success. Career success today depends not only on academic performance, but also on personality alignment, emotional stability, discipline, and resilience. This report helps students and parents make informed decisions about subject selection, career pathways, skill development, and personal growth planning.
                </p>
                <p>
                    The results should be viewed as a guidance tool rather than a final verdict. Students evolve with exposure, mentorship, and practice. This assessment serves as a starting point for meaningful conversations between students, parents, and educators — helping align academic choices with individual strengths while identifying areas that may benefit from improvement and support.
                </p>

                <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Interest Profiling (RIASEC)</h3>
                    <p className="mb-4">The first model, developed by psychologist John Holland, is a framework used to understand a person's career interests and the type of work environment they are most likely to thrive in. It identifies six interest categories, each representing a different personality-career fit.</p>
                    <ul className="space-y-2 list-none marker:text-primary">
                        <li><strong className="text-foreground">R - Realistic:</strong> Individuals who enjoy hands-on, practical activities. They prefer working with tools, machines, technology, or outdoor tasks.</li>
                        <li><strong className="text-foreground">I - Investigative:</strong> Analytical and curious individuals who like solving problems, researching, and working with ideas and data.</li>
                        <li><strong className="text-foreground">A - Artistic:</strong> Creative and expressive individuals who prefer open, flexible environments that allow innovation, design, or artistic creation.</li>
                        <li><strong className="text-foreground">S - Social:</strong> People-oriented individuals who enjoy helping, teaching, supporting, or guiding others.</li>
                        <li><strong className="text-foreground">E - Enterprising:</strong> Confident and persuasive individuals who like leading, influencing, and managing projects, teams, or businesses.</li>
                        <li><strong className="text-foreground">C - Conventional:</strong> Organized and detail-focused individuals who prefer structured tasks involving data, systems, and accuracy.</li>
                    </ul>
                    <p className="mt-3"><strong className="text-foreground">Purpose:</strong> The model is widely used in career guidance to help students identify careers that match their interests, strengths, and preferred working styles.</p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Personality Traits (OCEAN)</h3>
                    <p className="mb-4">The second assessment model, known as the Big Five Personality Traits, is one of the most widely used frameworks in psychology to describe human personality. It identifies five core traits, each representing a broad dimension of behaviour, emotion, and thinking patterns.</p>
                    <ul className="space-y-2 list-none">
                        <li><strong className="text-foreground">O - Openness:</strong> Reflects a person's level of curiosity, imagination, and willingness to try new things.</li>
                        <li><strong className="text-foreground">C - Conscientiousness:</strong> Organized, responsible, disciplined, and goal-focused individuals.</li>
                        <li><strong className="text-foreground">E - Extraversion:</strong> Reflects sociability, energy, and preference for interacting with others.</li>
                        <li><strong className="text-foreground">A - Agreeableness:</strong> Measures how cooperative, kind, and empathetic a person is.</li>
                        <li><strong className="text-foreground">N - Neuroticism:</strong> Relates to emotional stability. Individuals highly scored may experience stress frequently.</li>
                    </ul>
                    <p className="mt-3"><strong className="text-foreground">Purpose:</strong> Helps students understand their personality patterns and how these may influence their behaviour, communication style, decision making, and career interests.</p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. GRIT & Perseverance</h3>
                    <p className="mb-4">A psychological concept developed by researcher Angela Duckworth. It describes a person's ability to stay committed to long term goals and keep putting in effort, even when challenges or failures occur. GRIT helps explain why some people achieve high levels of success—not just because of talent, but because of persistence and hard work.</p>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong className="text-foreground">Passion:</strong> Having a consistent interest in a goal over a long period of time.</li>
                        <li><strong className="text-foreground">Perseverance:</strong> Continuing to work hard despite difficulties, setbacks, or slow progress.</li>
                    </ul>
                    <p className="mt-3"><strong className="text-foreground">Why this matters:</strong> Helps build resilience, improves academic performance, encourages a growth mindset, and supports long-term success.</p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Lifestyle Readiness Index</h3>
                    <p className="mb-4">Our day-to-day lifestyle, eating habits, and personal habits are critical in determining the ability of a student to concentrate, understand and perform well in different situations. This Lifestyle Readiness Index refers to a student's overall ability to make healthy decisions, and navigate personal, social, and emotional challenges effectively. It reflects how ready a student is to apply essential life skills that support long term success beyond academics.</p>
                    <p className="mb-4">This index typically evaluates key areas such as the ability to manage time, task deadlines, homework and personal habits such as food, bathroom breaks, sleep etc.</p>
                    <p><strong className="text-foreground">Purpose:</strong> The index is basically a multiplier for evaluation of a student according to his or her personal habits. These habits, often ignored due to their insignificance, lead to diminishing performances in both academia and personal life. This helps schools, parents and educators understand what lifestyle changes will help play a major role in long term success of a student.</p>
                </div>

            </div>
        </motion.div>
    );
};
