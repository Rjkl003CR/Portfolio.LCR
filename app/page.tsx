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

  const skills = [
    {
      icon: Code,
      title: "Languages & Frameworks",
      items: ["Java", "JavaScript", "TypeScript", "Spring Boot", "Next.js", "React.js"],
    },
    {
      icon: Database,
      title: "Data & Cloud",
      items: ["PostgreSQL", "MySQL", "SQL", "Vercel"],
    },
    {
      icon: Wrench,
      title: "Dev & Architecture",
      items: ["Git", "GitHub", "Jira", "REST APIs"],
    },
    {
      icon: BookOpen,
      title: "Analytical Skills",
      items: ["Agile/Scrum", "Requirements Analysis", "Process Modeling", "Stakeholder Comm."],
    },
  ];

  const projects = [
    {
      title: "FixZone",
      subtitle: "Vehicle Service Management Platform",
      bullets: [
        "Analyzed service shop operations across 4 stakeholder roles to map existing manual workflows and translate business requirements into digital solutions.",
        "Designed and implemented a scalable multi-tenant architecture using Next.js and Spring Boot, reducing manual workflow overhead by an estimated 60%.",
        "Engineered secure REST APIs with Role-Based Access Control (RBAC) to protect sensitive data across 15+ endpoints.",
      ],
      tech: ["Next.js", "Spring Boot", "PostgreSQL", "Jira"],
      link: "https://github.com/Rjkl003CR",
    },
    {
      title: "LoRa 10",
      subtitle: "Long-Range Hiker Safety System",
      date: "Aug. 2025",
      bullets: [
        "Engineered a complete embedded IoT solution from PCB design to firmware, solving the real-world problem of hiker safety in off-grid environments.",
        "Managed project lifecycle including hardware procurement, budget planning, and coordination of offshore PCB manufacturing.",
        "Developed custom OLED UI and FreeRTOS firmware supporting real-time emergency telemetry, establishing reliable communication over LoRa.",
      ],
      tech: ["ESP32", "LoRa SX1278", "GPS", "OLED", "BLE"],
      link: "https://github.com/Rjkl003CR",
    },
  ];

  const certifications = [
    {
      title: "HackElite 2.0 Finalist",
      desc: "LevelUp LMS EdTech Project - IEEE WIE Student Affinity Group",
      year: "2026",
    },
    {
      title: "InspiHER{Tech} V3.0 Finalist",
      desc: "IEEE WIE Student Branch Affinity Group (SLTC)",
      year: "2026",
    },
    {
      title: "Innovate with Ballerina Coding Challenge",
      desc: "IEEE CS Student Branch Chapter & WSO2",
      year: "2025",
    },
    {
      title: "Introduction to SQL",
      desc: "Sololearn",
      year: "2025",
    },
    {
      title: "FIT Expo Active Participant",
      desc: "Lora10 Microcontroller Project - IT Faculty",
      year: "2025",
    },
  ];

  const leadership = [
    {
      period: "2025 - 2026",
      title: "Main Batch Representative",
      org: "Batch 23, Faculty of Information Technology",
      desc: "Represented 200+ students and actively coordinated with faculty on academic concerns and curriculum feedback.",
    },
    {
      period: "2025 - Present",
      title: "HR Pillar Member",
      org: "FIT MOMENT, IT Faculty Media Unit",
      desc: "Managed recruitment pipelines for 15+ events and effectively coordinated tasks for 30+ team members.",
    },
    {
      period: "2026 - Present",
      title: "Program & Event Coordination",
      org: "IEEE WIE Student Branch Affinity Group",
      desc: "Organized technical workshops and skill-building sessions reaching 100+ attendees.",
    },
  ];

  const RESUME_URL =
    "https://drive.google.com/file/d/1G6yXHsM6qA9XaI32fa7dv-FPYuAGqu2t/view?usp=drive_link";

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
            <a
              href="#"
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-outfit), Outfit, sans-serif",
              }}
            >
              <span style={{ color: "var(--accent)" }}>CHAMATHKA</span>
              <span style={{ color: "var(--text-primary)" }}>.DEV</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
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
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setNavOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-sm font-medium transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-secondary)")
                      }
                    >
                      {link.label}
                    </motion.a>
                  ))}
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
              href="https://www.linkedin.com/in/chamathka-ranathunga-a825922aa"
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
              href="https://github.com/Rjkl003CR"
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
                src="https://drive.google.com/uc?export=view&id=1mNdOK9J5v8yRXJvIkg-LFLUV8Oip9w2p"
                alt="Chamathka Ranathunga"
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
                Hello, I&apos;m
              </span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
              style={{
                fontFamily: "var(--font-outfit), Outfit, sans-serif",
              }}
            >
              <TypewriterText text="Chamathka Ranathunga" delay={1200} speed={70} />
            </h1>
            <p
              className="text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-10"
              style={{ color: "var(--accent)" }}
            >
              <TypewriterText text="Full-Stack Developer & Creative Thinker" delay={3200} speed={60} />
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

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
              style={{ borderColor: "var(--accent-glow-strong)" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </motion.div>
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
                  <p>
                    I am an Information Technology undergraduate at the{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      University of Moratuwa
                    </strong>{" "}
                    with a passion for software design and system architecture. I
                    enjoy translating complex business domain problems into scalable web
                    applications and optimizing system workflows.
                  </p>
                  <p>
                    My hands-on experience spans working with full-stack web
                    technologies like{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      Next.js, Spring Boot, and PostgreSQL
                    </strong>
                    , down to modern IoT development using ESP32. I actively participate in hackathons,
                    university leadership roles, and tech events.
                  </p>
                  <p>
                    I am actively seeking <strong style={{ color: "var(--accent)" }}>Software Engineering</strong> and <strong style={{ color: "var(--accent)" }}>Business Analyst internship</strong> opportunities where I can apply my dual focus on technical development and analytical problem-solving to real business challenges.
                  </p>
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
                        Moratuwa, Sri Lanka
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        rjklcr003@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        +94 76 592 3995
                      </span>
                    </div>
                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid var(--border-color)" }}
                    >
                      <div className="flex gap-4">
                        <a
                          href="https://github.com/Rjkl003CR"
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
                          href="https://www.linkedin.com/in/chamathka-ranathunga-a825922aa"
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
              {skills.map((skill, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <TiltCard>
                    <div className="glass-card p-6 group cursor-default h-full">
                      <div className="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                        <skill.icon
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
                        {skill.items.map((item, j) => (
                          <span key={j} className="tech-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
                            <p
                              className="text-sm font-medium"
                              style={{ color: "var(--accent)" }}
                            >
                              {project.subtitle}
                            </p>
                          </div>
                          {project.date && (
                            <span
                              className="cert-badge text-xs px-3 py-1 rounded-full font-mono"
                            >
                              {project.date}
                            </span>
                          )}
                        </div>

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

                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tech.map((t, j) => (
                            <span key={j} className="tech-tag">
                              {t}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link"
                          style={{ color: "var(--accent)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.gap = "10px")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.gap = "8px")
                          }
                        >
                          <GithubIcon size={15} /> View Source Code{" "}
                          <ArrowUpRight size={14} className="link-arrow" />
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
                  {[
                    {
                      degree: "BSc (Hons) in Information Technology",
                      school: "University of Moratuwa",
                      year: "Expected 2028",
                      location: "Moratuwa, Sri Lanka",
                      active: true,
                    },
                    {
                      degree: "G.C.E. Advanced Level (A/L)",
                      school: "Narammala Mayurapada Central College",
                      year: "2022",
                      location: "Kurunegala, Sri Lanka",
                      detail:
                        "Combined Maths (B), Physics (B), Chemistry (A) — Z-Score: 1.6516",
                    },
                    {
                      degree: "G.C.E. Ordinary Level (O/L)",
                      school: "Narammala Mayurapada Central College",
                      year: "2019",
                      location: "Kurunegala, Sri Lanka",
                      detail:
                        "9 A's (including Mathematics, English, and Science)",
                    },
                  ].map((edu, i) => (
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
                        <div className="glass-card p-5 flex items-start justify-between gap-4 group">
                          <div>
                            <h3 className="font-semibold text-sm">
                              {cert.title}
                            </h3>
                            <p
                              className="text-xs mt-1"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {cert.desc}
                            </p>
                          </div>
                          <span className="cert-badge text-xs font-mono px-3 py-1 rounded-md shrink-0">
                            {cert.year}
                          </span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
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
                        {item.org}
                      </p>
                      {item.desc && (
                        <p
                          className="text-xs mt-3 leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
                    I am currently seeking software engineering and business analyst internship
                    opportunities. Feel free to send me a message or connect directly!
                  </p>

                  {/* Email */}
                  <a
                    href="mailto:rjklcr003@gmail.com"
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
                      <p className="text-sm font-semibold">rjklcr003@gmail.com</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:0765923995"
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
                      <p className="text-sm font-semibold">+94 76 592 3995</p>
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
                      { icon: GithubIcon, href: "https://github.com/Rjkl003CR", label: "GitHub" },
                      { icon: LinkedinIcon, href: "https://www.linkedin.com/in/chamathka-ranathunga-a825922aa", label: "LinkedIn" },
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

            <div className="section-divider mt-16 mb-6" />
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Chamathka Ranathunga. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

