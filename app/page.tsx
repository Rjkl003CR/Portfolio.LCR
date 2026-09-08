"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  Code,
  Server,
  Database,
  Wrench,
  Menu,
  X,
  BookOpen,
  Award,
  Users,
  MapPin,
  ChevronRight,
  ExternalLink,
  Download,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { client } from "@/sanity/lib/client";
import {
  PROJECTS_QUERY, PROFILE_QUERY, SKILLS_QUERY, CERTIFICATIONS_QUERY, EDUCATION_QUERY, LEADERSHIP_QUERY,
  fallbackProjects, fallbackProfile, fallbackSkills, fallbackCertifications, fallbackEducation, fallbackLeadership,
  type SanityProject, type SanityProfile, type SanitySkillCategory, type SanityCertification, type SanityEducation, type SanityLeadership,
} from "@/sanity/lib/queries";

/* ───── Inline SVG Icons ───── */
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ───── Animation Variants ───── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

/* ───── Icon Mapping (for Sanity iconKey → Lucide component) ───── */
const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  code: Code,
  database: Database,
  wrench: Wrench,
  book: BookOpen,
  server: Server,
};

/* ───── Scroll Down Button ───── */
function ScrollDownButton() {
  return (
    <div className="flex justify-center mt-12 pb-8">
      <button
        aria-label="Scroll down"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 transition-colors group-hover:border-[var(--accent)]"
          style={{ borderColor: "rgba(20,184,166,0.3)" }}
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </motion.div>
      </button>
    </div>
  );
}

/* ───── Scroll Progress Bar ───── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ───── Typewriter Effect ───── */
function TypewriterText({ text, delay = 0, speed = 60 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      {showCursor && <span className="animate-blink" style={{ color: "var(--accent)" }}>|</span>}
    </span>
  );
}

/* ───── Floating Particles ───── */
function FloatingParticles() {
  const particles = [
    { size: 4, top: "15%", left: "10%", className: "particle-1", delay: "0s" },
    { size: 3, top: "25%", left: "85%", className: "particle-2", delay: "2s" },
    { size: 5, top: "60%", left: "5%", className: "particle-3", delay: "4s" },
    { size: 3, top: "70%", left: "90%", className: "particle-1", delay: "1s" },
    { size: 4, top: "40%", left: "75%", className: "particle-2", delay: "3s" },
    { size: 2, top: "80%", left: "20%", className: "particle-3", delay: "5s" },
    { size: 3, top: "10%", left: "50%", className: "particle-1", delay: "2.5s" },
    { size: 2, top: "50%", left: "30%", className: "particle-2", delay: "1.5s" },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`particle ${p.className}`}
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}

/* ───── 3D Tilt Card ───── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───── Scroll-Reveal Wrapper ───── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───── Section Heading ───── */
function SectionHeading({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} style={{ color: "var(--accent)" }} />
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="text-3xl sm:text-4xl font-bold"
        style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ───── Contact Form ───── */
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "var(--text-primary)",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>
          Your Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          minLength={2}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(20,184,166,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      <div>
        <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>
          Your Email
        </label>
        <input
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(20,184,166,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      <div>
        <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>
          Message
        </label>
        <textarea
          placeholder="Tell me about the opportunity..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          minLength={10}
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(20,184,166,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium"
          style={{ color: "var(--accent)" }}
        >
          ✅ Message sent! I&apos;ll get back to you soon.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-red-400"
        >
          ❌ {errorMsg}
        </motion.p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-glow px-7 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            <Mail size={16} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

/* ───── Loading Screen ───── */
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="loading-overlay"
    >
      <div className="relative flex flex-col items-center">
        {/* Glow behind the spinner */}
        <div className="loading-glow" />

        {/* Spinner */}
        <div className="relative w-[80px] h-[80px] mb-8">
          <div className="loading-spinner absolute inset-0" />
          <div className="loading-spinner-inner" />
        </div>

        {/* Text */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <h2 className="text-xl font-bold tracking-[0.3em] text-[#2DD4BF]">
            LOADING...
          </h2>
          <p className="text-sm italic text-[#14B8A6] opacity-80">
            Preparing your experience...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    // Simulate loading time 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#leadership", label: "Leadership" },
    { href: "#contact", label: "Contact" },
  ];

  // ─── Sanity CMS State (all sections) ────────────────────────
  const [profile, setProfile] = useState<SanityProfile>(fallbackProfile);
  const [skills, setSkills] = useState<SanitySkillCategory[]>(fallbackSkills);
  const [projects, setProjects] = useState<SanityProject[]>(fallbackProjects);
  const [certifications, setCertifications] = useState<SanityCertification[]>(fallbackCertifications);
  const [educationList, setEducationList] = useState<SanityEducation[]>(fallbackEducation);
  const [leadership, setLeadership] = useState<SanityLeadership[]>(fallbackLeadership);

  useEffect(() => {
    async function fetchAllSanityData() {
      try {
        const [
          sanityProfile,
          sanitySkills,
          sanityProjects,
          sanityCerts,
          sanityEdu,
          sanityLeadership,
        ] = await Promise.all([
          client.fetch<SanityProfile>(PROFILE_QUERY),
          client.fetch<SanitySkillCategory[]>(SKILLS_QUERY),
          client.fetch<SanityProject[]>(PROJECTS_QUERY),
          client.fetch<SanityCertification[]>(CERTIFICATIONS_QUERY),
          client.fetch<SanityEducation[]>(EDUCATION_QUERY),
          client.fetch<SanityLeadership[]>(LEADERSHIP_QUERY),
        ]);

        if (sanityProfile) setProfile(sanityProfile);
        if (sanitySkills && sanitySkills.length > 0) setSkills(sanitySkills);
        if (sanityProjects && sanityProjects.length > 0) setProjects(sanityProjects);
        if (sanityCerts && sanityCerts.length > 0) setCertifications(sanityCerts);
        if (sanityEdu && sanityEdu.length > 0) setEducationList(sanityEdu);
        if (sanityLeadership && sanityLeadership.length > 0) setLeadership(sanityLeadership);
      } catch (err) {
        console.warn("Could not fetch Sanity data, staying on fallback data:", err);
      }
    }
    fetchAllSanityData();
  }, []);

  // Derived values from profile
  const RESUME_URL = profile.resumeUrl || fallbackProfile.resumeUrl || "";
  const profileImageSrc = profile.uploadedImageUrl || profile.profileImageUrl || fallbackProfile.profileImageUrl || "";


  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div
        className="min-h-screen"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          height: isLoading ? "100vh" : "auto",
          overflow: isLoading ? "hidden" : "visible",
        }}
      >
        {/* Scroll Progress */}
        <ScrollProgress />

        {/* ═══ NAVIGATION ═══ */}
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 w-full z-50"
          style={{
            background: "rgba(11, 17, 33, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
            <a href="#" className="flex items-center gap-2 group">
              {/* Terminal icon box — like AIU.DEV style */}
              <div
                className="flex items-center justify-center rounded-lg transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(20,184,166,0.4)]"
                style={{
                  background: "rgba(20,184,166,0.1)",
                  border: "1px solid rgba(20,184,166,0.4)",
                  borderRadius: "8px",
                  padding: "4px 9px",
                  color: "var(--accent)",
                  fontFamily: "var(--font-outfit), monospace",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                }}
              >
                &gt;_
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
              >
                <span style={{ color: "var(--accent)" }}>CHAMATHKA</span>
                <span style={{ color: "var(--text-primary)" }}>.DEV</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link text-sm font-medium transition-all duration-300"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      textShadow: isActive ? "0 0 10px rgba(20,184,166,0.3)" : "none",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden focus:outline-none"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
                style={{
                  background: "var(--bg-secondary)",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <div className="px-6 py-5 flex flex-col gap-4">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setNavOpen(false); // Start collapse animation
                          
                          // Wait for the collapse animation (0.3s) to finish before calculating scroll position
                          setTimeout(() => {
                            const targetId = link.href.substring(1);
                            const elem = document.getElementById(targetId);
                            if (elem) {
                              elem.scrollIntoView({ behavior: "smooth" });
                              window.history.pushState(null, "", link.href);
                            }
                          }, 350); 
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm font-medium transition-all duration-300"
                        style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--text-secondary)")}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ═══ HERO SECTION ═══ */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden mesh-gradient"
        >
          {/* Floating Particles */}
          <FloatingParticles />

          {/* Background ambient glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-15 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          {/* Top bar: Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute top-24 right-8 sm:right-12 flex gap-3"
          >
            <a
              href={profile.linkedinUrl || fallbackProfile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.githubUrl || fallbackProfile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
          </motion.div>

          {/* Orbs + Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="profile-container mb-12"
            style={{ width: 320, height: 420 }}
          >
            {/* Profile photo orb */}
            <div
              className="absolute animate-float"
              style={{
                width: 220,
                height: 220,
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0.05) 100%)",
                border: "1px solid rgba(20,184,166,0.2)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <Image
                src={profileImageSrc}
                alt={profile.name || "Profile"}
                width={300}
                height={300}
                className="profile-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "65%",
                  border: "none",
                }}
                priority
              />
            </div>

            {/* Middle Orb */}
            <div
              className="absolute animate-float-delayed animate-pulse-glow"
              style={{
                width: 180,
                height: 180,
                top: 140,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, var(--accent) 0%, var(--accent-dark) 70%, rgba(13,148,136,0.2) 100%)",
                zIndex: 5,
              }}
            />

            {/* Bottom Orb */}
            <div
              className="absolute animate-float-slow"
              style={{
                width: 150,
                height: 150,
                top: 260,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, var(--accent-dark) 0%, rgba(13,148,136,0.15) 100%)",
                opacity: 0.7,
                zIndex: 3,
              }}
            />

            {/* Rotating ring */}
            <div
              className="absolute animate-spin-slow"
              style={{
                width: 300,
                height: 300,
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                border: "1px solid rgba(20,184,166,0.08)",
                zIndex: 1,
              }}
            />

            {/* Second ring */}
            <div
              className="absolute animate-spin-slow"
              style={{
                width: 340,
                height: 340,
                top: -40,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                border: "1px dashed rgba(20,184,166,0.05)",
                zIndex: 1,
                animationDirection: "reverse",
                animationDuration: "30s",
              }}
            />
          </motion.div>

          {/* Greeting + Name + Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            {/* Professional Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="mb-4"
            >
              <span className="text-lg sm:text-xl font-light tracking-wide" style={{ color: "var(--text-secondary)" }}>
                {profile.greeting || "Hello, I'm"}
              </span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
              style={{
                fontFamily: "var(--font-outfit), Outfit, sans-serif",
              }}
            >
              <TypewriterText text={profile.name || fallbackProfile.name} delay={1200} speed={70} />
            </h1>
            <p
              className="text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-10"
              style={{ color: "var(--accent)" }}
            >
              <TypewriterText text={profile.title || fallbackProfile.title || ""} delay={3200} speed={60} />
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-8"
            >
              <a
                href="#projects"
                className="btn-glow px-7 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2"
              >
                View Projects <ChevronRight size={16} />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-outline px-7 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2"
              >
                <Download size={16} /> Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator — click to scroll down one viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <button
              aria-label="Scroll down"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 transition-colors group-hover:border-[var(--accent)]"
                style={{ borderColor: "var(--accent-glow-strong)" }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </motion.div>
            </button>
          </motion.div>
        </section>

        {/* ═══ ABOUT SECTION ═══ */}
        <section id="about" className="py-24 px-6 mesh-gradient">
          <div className="max-w-6xl mx-auto">
            <div className="section-divider mb-20" />
            <Reveal>
              <SectionHeading icon={Users} label="Who I Am" title="About Me" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal className="md:col-span-2">
                <div
                  className="space-y-5 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {(profile.bio || fallbackProfile.bio || []).map((paragraph, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <TiltCard>
                  <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        {profile.location || fallbackProfile.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        {profile.email || fallbackProfile.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        {profile.phone || fallbackProfile.phone}
                      </span>
                    </div>
                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid var(--border-color)" }}
                    >
                      <div className="flex gap-4">
                        <a
                          href={profile.githubUrl || fallbackProfile.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-medium transition-all duration-300"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--accent)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <GithubIcon size={14} /> GitHub
                        </a>
                        <a
                          href={profile.linkedinUrl || fallbackProfile.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-medium transition-all duration-300"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--accent)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <LinkedinIcon size={14} /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
          <ScrollDownButton />
        </section>

        {/* ═══ SKILLS SECTION ═══ */}
        <section
          id="skills"
          className="py-24 px-6"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionHeading
                icon={Code}
                label="What I Work With"
                title="Technical Expertise"
              />
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {skills.map((skill, i) => {
                const IconComp = iconMap[skill.iconKey || "code"] || Code;
                return (
                <motion.div key={i} variants={staggerItem}>
                  <TiltCard>
                    <div className="glass-card p-6 group cursor-default h-full">
                      <div className="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                        <IconComp
                          size={24}
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                      <h3
                        className="text-lg font-bold mb-4"
                        style={{
                          fontFamily:
                            "var(--font-outfit), Outfit, sans-serif",
                        }}
                      >
                        {skill.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(skill.items || []).map((item, j) => (
                          <span key={j} className="tech-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
                );
              })}
            </motion.div>
          </div>
          <ScrollDownButton />
        </section>

        {/* ═══ PROJECTS SECTION ═══ */}
        <section id="projects" className="py-24 px-6 mesh-gradient">
          <div className="max-w-6xl mx-auto">
            <div className="section-divider mb-20" />
            <Reveal>
              <SectionHeading
                icon={ExternalLink}
                label="What I've Built"
                title="Featured Projects"
              />
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {projects.map((project, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <TiltCard>
                    <div className="glass-card overflow-hidden group">
                      {/* Gradient accent bar */}
                      <div
                        className="h-1 animate-gradient"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--accent-dark), var(--accent), var(--accent-light), var(--accent-dark))",
                          backgroundSize: "200% 100%",
                        }}
                      />

                      {/* Optional Sanity project image */}
                      {project.imageUrl && (
                        <div className="relative w-full h-48 overflow-hidden bg-black/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-7">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3
                              className="text-2xl font-bold mb-1"
                              style={{
                                fontFamily:
                                  "var(--font-outfit), Outfit, sans-serif",
                              }}
                            >
                              {project.title}
                            </h3>
                            {project.subtitle && (
                              <p
                                className="text-sm font-medium"
                                style={{ color: "var(--accent)" }}
                              >
                                {project.subtitle}
                              </p>
                            )}
                          </div>
                          {project.date && (
                            <span
                              className="cert-badge text-xs px-3 py-1 rounded-full font-mono"
                            >
                              {project.date}
                            </span>
                          )}
                        </div>

                        {project.bullets && project.bullets.length > 0 && (
                          <ul
                            className="space-y-2.5 my-5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {project.bullets.map((bullet, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 text-sm leading-relaxed"
                              >
                                <ChevronRight
                                  size={14}
                                  className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                  style={{
                                    color: "var(--accent)",
                                    opacity: 0.6,
                                  }}
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.tech.map((t, j) => (
                              <span key={j} className="tech-tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 flex-wrap">
                          {(project.github || project.link) && (
                            <a
                              href={project.github || project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link"
                              style={{ color: "var(--accent)" }}
                            >
                              <GithubIcon size={15} /> View Source Code{" "}
                              <ArrowUpRight size={14} className="link-arrow" />
                            </a>
                          )}
                          {project.link && project.github && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link"
                              style={{ color: "var(--accent)" }}
                            >
                              <ExternalLink size={15} /> Live Demo{" "}
                              <ArrowUpRight size={14} className="link-arrow" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <ScrollDownButton />
        </section>

        {/* ═══ EDUCATION & ACHIEVEMENTS ═══ */}
        <section
          id="education"
          className="py-24 px-6"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Education */}
              <div>
                <Reveal>
                  <SectionHeading
                    icon={BookOpen}
                    label="Academics"
                    title="Education"
                  />
                </Reveal>

                <div className="space-y-8 pl-6 timeline-line">
                  {educationList.map((edu, i) => (
                    <Reveal key={i} delay={i * 0.15}>
                      <div className="relative pl-6">
                        {/* Timeline dot */}
                        <div
                          className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full"
                          style={{
                            background: edu.active
                              ? "var(--accent)"
                              : "var(--bg-secondary)",
                            border: `2px solid ${edu.active
                              ? "var(--accent)"
                              : "var(--text-muted)"
                              }`,
                            boxShadow: edu.active
                              ? "0 0 16px rgba(20,184,166,0.5)"
                              : "none",
                          }}
                        />
                        <h3 className="text-lg font-bold">{edu.degree}</h3>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--accent)" }}
                        >
                          {edu.school}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {edu.year} • {edu.location}
                        </p>
                        {edu.detail && (
                          <p
                            className="text-xs mt-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {edu.detail}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <Reveal>
                  <SectionHeading
                    icon={Award}
                    label="Honors & Recognition"
                    title="Certifications & Awards"
                  />
                </Reveal>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {certifications.map((cert, i) => (
                    <motion.div key={i} variants={staggerItem}>
                      <TiltCard>
                        {cert.url ? (
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="glass-card p-5 flex items-start justify-between gap-4 group cursor-pointer hover:border-[var(--accent)] transition-colors"
                          >
                            <div>
                              <h3 className="font-semibold text-sm flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors">
                                {cert.title}
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h3>
                              <p
                                className="text-xs mt-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {cert.description}
                              </p>
                            </div>
                            <span className="cert-badge text-xs font-mono px-3 py-1 rounded-md shrink-0 group-hover:bg-[rgba(20,184,166,0.15)] group-hover:text-[var(--accent)] transition-colors">
                              {cert.year}
                            </span>
                          </a>
                        ) : (
                          <div className="glass-card p-5 flex items-start justify-between gap-4 group">
                            <div>
                              <h3 className="font-semibold text-sm">
                                {cert.title}
                              </h3>
                              <p
                                className="text-xs mt-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {cert.description}
                              </p>
                            </div>
                            <span className="cert-badge text-xs font-mono px-3 py-1 rounded-md shrink-0">
                              {cert.year}
                            </span>
                          </div>
                        )}
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          <ScrollDownButton />
        </section>

        {/* ═══ LEADERSHIP SECTION ═══ */}
        <section id="leadership" className="py-24 px-6 mesh-gradient">
          <div className="max-w-6xl mx-auto">
            <div className="section-divider mb-20" />
            <Reveal>
              <SectionHeading
                icon={Users}
                label="Community & Responsibilities"
                title="Leadership Experience"
              />
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {leadership.map((item, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <TiltCard>
                    <div className="glass-card p-6 group h-full">
                      <span className="cert-badge text-xs font-mono inline-block mb-3 px-3 py-1 rounded-md">
                        {item.period}
                      </span>
                      <h3 className="text-base font-bold mb-1">
                        {item.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--accent)", opacity: 0.8 }}
                      >
                        {item.organization}
                      </p>
                      {item.description && (
                        <p
                          className="text-xs mt-3 leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <ScrollDownButton />
        </section>

        {/* ═══ CONTACT / FOOTER ═══ */}
        <footer
          id="contact"
          className="relative py-24 px-6 overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal>
              <SectionHeading icon={Mail} label="Get In Touch" title="Let's Work Together" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <Reveal>
                <ContactForm />
              </Reveal>

              {/* Contact Info */}
              <Reveal delay={0.2}>
                <div className="flex flex-col gap-6">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {profile.contactBlurb || fallbackProfile.contactBlurb}
                  </p>

                  {/* Email */}
                  <a
                    href={`mailto:${profile.email || fallbackProfile.email}`}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 transition-all hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(20,184,166,0.1)", color: "var(--accent)" }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Email</p>
                      <p className="text-sm font-semibold">{profile.email || fallbackProfile.email}</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${(profile.phone || fallbackProfile.phone || "").replace(/\s/g, "")}`}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 transition-all hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(20,184,166,0.1)", color: "var(--accent)" }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Phone</p>
                      <p className="text-sm font-semibold">{profile.phone || fallbackProfile.phone}</p>
                    </div>
                  </a>

                  {/* Resume */}
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card p-4 rounded-xl flex items-center gap-4 transition-all hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(20,184,166,0.1)", color: "var(--accent)" }}
                    >
                      <Download size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Resume</p>
                      <p className="text-sm font-semibold">Download My CV</p>
                    </div>
                  </a>

                  {/* Socials */}
                  <div className="flex gap-3 mt-2">
                    {[
                      { icon: GithubIcon, href: profile.githubUrl || fallbackProfile.githubUrl || "", label: "GitHub" },
                      { icon: LinkedinIcon, href: profile.linkedinUrl || fallbackProfile.linkedinUrl || "", label: "LinkedIn" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400"
                        style={{ border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.color = "var(--accent)";
                          e.currentTarget.style.background = "rgba(20,184,166,0.08)";
                          e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
                          e.currentTarget.style.boxShadow = "0 8px 25px rgba(20,184,166,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-color)";
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        aria-label={social.label}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ─── Minimal Professional Footer Bottom ─── */}
            <div className="section-divider mt-20 mb-10" />

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-4">
              {/* Left: Brand & Tagline */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      background: "rgba(20,184,166,0.08)",
                      border: "1px solid rgba(20,184,166,0.35)",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      color: "var(--accent)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "700",
                    }}
                  >
                    &gt;_
                  </div>
                  <span style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontSize: "12px", fontWeight: 700 }}>
                    <span style={{ color: "var(--accent)" }}>CHAMATHKA</span>
                    <span style={{ color: "var(--text-primary)" }}>.DEV</span>
                  </span>
                </div>
              </div>

              {/* Middle: Links */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-3 mt-4 md:mt-0 text-center md:text-left">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-center transition-all duration-200 hover:scale-110 text-[11px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right: Socials */}
              <div className="flex items-center justify-center md:justify-end gap-3 mt-2 md:mt-0">
                <a
                  href={profile.githubUrl || fallbackProfile.githubUrl || ""}
                  target="_blank" rel="noreferrer" aria-label="GitHub"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <GithubIcon size={14} />
                </a>
                <a
                  href={profile.linkedinUrl || fallbackProfile.linkedinUrl || ""}
                  target="_blank" rel="noreferrer" aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <LinkedinIcon size={14} />
                </a>
                <a
                  href={`mailto:${profile.email || fallbackProfile.email}`}
                  aria-label="Email"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <Mail size={14} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-wrap items-center justify-center w-full gap-x-2 gap-y-1 mt-8 text-center text-[10px] text-[var(--text-muted)]">
              <p>
                © {new Date().getFullYear()} {profile.name || fallbackProfile.name}. All rights reserved.
              </p>
              <span className="hidden sm:inline opacity-50">•</span>
              <p>
                Designed &amp; built with ♥ in Sri Lanka
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

