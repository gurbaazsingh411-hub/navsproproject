import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "For Schools", "For Students"],
  Company: ["About Us", "Careers", "Blog", "Contact"],
  Resources: ["Help Center", "Privacy Policy", "Terms of Service", "FAQ"],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="bg-primary py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-glow">
                <span className="text-secondary-foreground font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-primary-foreground">
                NAVSPRO
              </span>
            </div>
            <p className="text-primary-foreground/50 mb-6 max-w-sm leading-relaxed">
              Empowering students with science-backed guidance to discover their
              unique potential and navigate toward their ideal career path.
            </p>
            <div className="space-y-3 text-primary-foreground/50 text-sm">
              <motion.a
                href="mailto:hello@navspro.com"
                className="flex items-center gap-3 hover:text-secondary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4" />
                <span>hello@navspro.com</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+91 91704 20687</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Delhi, India</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.2 }}
            >
              <h4 className="text-primary-foreground font-semibold mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + linkIndex * 0.05 + 0.3 }}
                  >
                    <a
                      href="#"
                      className="text-primary-foreground/50 hover:text-secondary transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-primary-foreground/40 text-sm">
            © 2024 NAVSPRO. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/5 hover:bg-secondary/20 flex items-center justify-center text-primary-foreground/50 hover:text-secondary transition-all text-sm font-medium"
              >
                {social.name.charAt(0)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
