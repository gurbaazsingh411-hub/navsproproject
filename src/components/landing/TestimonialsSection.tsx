import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "NAVSPRO helped me understand myself in ways I never expected. The assessment was eye-opening, and my mentor has been incredible in guiding my journey.",
    name: "Priya Sharma",
    role: "Class 12 Student, Delhi",
    avatar: "PS",
    rating: 5,
  },
  {
    quote: "As a school counselor, this platform has transformed how we guide our students. The reports are comprehensive yet easy to understand for both students and parents.",
    name: "Dr. Rajesh Kumar",
    role: "School Counselor, Mumbai",
    avatar: "RK",
    rating: 5,
  },
  {
    quote: "My daughter finally has clarity about her future. The mentorship program gave her confidence to pursue her passion in design. We're so grateful!",
    name: "Meera Patel",
    role: "Parent, Bangalore",
    avatar: "MP",
    rating: 5,
  },
  {
    quote: "The visual reports are fantastic. For the first time, I could see my strengths laid out clearly. It changed how I think about my career options.",
    name: "Arjun Mehta",
    role: "Class 11 Student, Pune",
    avatar: "AM",
    rating: 5,
  },
  {
    quote: "We've partnered with NAVSPRO for over a year now. The impact on our students' career readiness has been remarkable. Highly recommend for any school.",
    name: "Principal Sunita Roy",
    role: "St. Xavier's School, Kolkata",
    avatar: "SR",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-medium ${isActive ? '' : 'hidden md:block'}`}
    >
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>
      
      <Quote className="w-10 h-10 text-secondary/20 mb-4" />
      
      <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <motion.div 
          className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-glow"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-secondary-foreground font-bold text-lg">{testimonial.avatar}</span>
        </motion.div>
        <div>
          <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
          <p className="text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-secondary" />
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Stories of <span className="text-gradient-secondary">Discovery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students, parents, and educators who have experienced the NAVSPRO difference
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <TestimonialCard 
              key={activeIndex}
              testimonial={testimonials[activeIndex]} 
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex 
                      ? "w-8 h-2 bg-secondary" 
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
