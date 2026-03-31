import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  Twitter,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Dark Mode Hook ────────────────────────────────────────────────────────────

function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("rba-theme");
      if (stored) return stored === "dark";
    } catch {}
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("rba-theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return { isDark, setIsDark };
}

// ─── Moon Knight Overlay ──────────────────────────────────────────────────────

const STARS = [
  { id: "s1", x: 8, y: 12, size: 2.5, delay: 0 },
  { id: "s2", x: 18, y: 35, size: 2, delay: 0.1 },
  { id: "s3", x: 30, y: 8, size: 3, delay: 0.2 },
  { id: "s4", x: 45, y: 22, size: 2, delay: 0.05 },
  { id: "s5", x: 60, y: 15, size: 2.5, delay: 0.15 },
  { id: "s6", x: 72, y: 40, size: 2, delay: 0.25 },
  { id: "s7", x: 85, y: 10, size: 3, delay: 0.08 },
  { id: "s8", x: 92, y: 55, size: 2, delay: 0.18 },
  { id: "s9", x: 15, y: 65, size: 2.5, delay: 0.3 },
  { id: "s10", x: 38, y: 75, size: 2, delay: 0.12 },
  { id: "s11", x: 55, y: 60, size: 3, delay: 0.22 },
  { id: "s12", x: 75, y: 72, size: 2, delay: 0.07 },
  { id: "s13", x: 88, y: 80, size: 2.5, delay: 0.17 },
  { id: "s14", x: 5, y: 88, size: 2, delay: 0.28 },
];

const SHOOTING_STARS = [
  { id: "ss1", startX: 80, startY: 5, delay: 0.05 },
  { id: "ss2", startX: 65, startY: 10, delay: 0.2 },
  { id: "ss3", startX: 90, startY: 20, delay: 0.38 },
  { id: "ss4", startX: 75, startY: 3, delay: 0.52 },
  { id: "ss5", startX: 55, startY: 8, delay: 0.65 },
];

const BIRDS = [
  { id: "b1", y: 18, duration: 1.6, delay: 0.05, scale: 1 },
  { id: "b2", y: 35, duration: 2.1, delay: 0.15, scale: 0.75 },
  { id: "b3", y: 25, duration: 1.8, delay: 0.28, scale: 0.9 },
  { id: "b4", y: 45, duration: 1.95, delay: 0.08, scale: 0.8 },
];

const CLOUDS = [
  { id: "c1", y: 20, duration: 2.1, delay: 0, scaleX: 1 },
  { id: "c2", y: 40, duration: 1.95, delay: 0.1, scaleX: 0.75 },
  { id: "c3", y: 60, duration: 2.25, delay: 0.05, scaleX: 0.85 },
];

function MoonKnightOverlay({
  visible,
  toDay,
}: {
  visible: boolean;
  toDay: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{
            backgroundColor: toDay
              ? "rgba(120, 60, 0, 0.85)"
              : "rgba(0, 0, 0, 0.92)",
          }}
        >
          {toDay ? (
            <>
              {/* ── Floating Clouds ──────────────────────────── */}
              {CLOUDS.map((cloud) => (
                <motion.div
                  key={cloud.id}
                  initial={{ x: "-15%", opacity: 0 }}
                  animate={{ x: "110%", opacity: [0, 0.75, 0.75, 0] }}
                  transition={{
                    duration: cloud.duration,
                    delay: cloud.delay,
                    ease: "linear",
                    opacity: { times: [0, 0.1, 0.85, 1] },
                  }}
                  style={{
                    position: "absolute",
                    top: `${cloud.y}%`,
                    left: 0,
                    transformOrigin: "left center",
                  }}
                >
                  <svg
                    width={Math.round(160 * cloud.scaleX)}
                    height="60"
                    viewBox="0 0 160 60"
                    fill="none"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="80"
                      cy="42"
                      rx="70"
                      ry="18"
                      fill="white"
                      opacity="0.9"
                    />
                    <ellipse
                      cx="60"
                      cy="34"
                      rx="40"
                      ry="22"
                      fill="white"
                      opacity="0.9"
                    />
                    <ellipse
                      cx="100"
                      cy="32"
                      rx="35"
                      ry="20"
                      fill="white"
                      opacity="0.85"
                    />
                    <ellipse cx="80" cy="28" rx="28" ry="18" fill="white" />
                  </svg>
                </motion.div>
              ))}

              {/* ── Flying Birds ─────────────────────────────── */}
              {BIRDS.map((bird) => (
                <motion.div
                  key={bird.id}
                  initial={{ x: "-10%", opacity: 0 }}
                  animate={{ x: "110%", opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: bird.duration,
                    delay: bird.delay,
                    ease: "easeInOut",
                    opacity: { times: [0, 0.08, 0.85, 1] },
                  }}
                  style={{
                    position: "absolute",
                    top: `${bird.y}%`,
                    left: 0,
                    transform: `scale(${bird.scale})`,
                    transformOrigin: "left center",
                  }}
                >
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    {/* Left wing */}
                    <path
                      d="M20 12 Q10 4 2 8"
                      stroke="#1a1a1a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Right wing */}
                    <path
                      d="M20 12 Q30 4 38 8"
                      stroke="#1a1a1a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              ))}

              {/* ── Animated Sun ──────────────────────────────── */}
              <motion.div
                initial={{ scale: 0.3, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0.3, 1.3, 0],
                  rotate: [0, 90, 90],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.0,
                  times: [0, 0.55, 1],
                  ease: "easeInOut",
                }}
                style={{ position: "relative", width: 180, height: 180 }}
              >
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  fill="none"
                  role="img"
                  aria-label="Sun icon – switching to day mode"
                >
                  {/* 8 rays – static to avoid array-index-key lint */}
                  <line
                    x1="142.00"
                    y1="90.00"
                    x2="170.00"
                    y2="90.00"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="126.77"
                    y1="126.77"
                    x2="146.57"
                    y2="146.57"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="90.00"
                    y1="142.00"
                    x2="90.00"
                    y2="170.00"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="53.23"
                    y1="126.77"
                    x2="33.43"
                    y2="146.57"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="38.00"
                    y1="90.00"
                    x2="10.00"
                    y2="90.00"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="53.23"
                    y1="53.23"
                    x2="33.43"
                    y2="33.43"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="90.00"
                    y1="38.00"
                    x2="90.00"
                    y2="10.00"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="126.77"
                    y1="53.23"
                    x2="146.57"
                    y2="33.43"
                    stroke="#FCD34D"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Core circle */}
                  <circle cx="90" cy="90" r="42" fill="#FCD34D" />
                  {/* Inner highlight */}
                  <circle cx="78" cy="78" r="12" fill="#FEF3C7" opacity="0.6" />
                </svg>
              </motion.div>
            </>
          ) : (
            <>
              {/* ── Twinkling Stars ───────────────────────────── */}
              {STARS.map((star) => (
                <motion.div
                  key={star.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.4, 1, 0] }}
                  transition={{
                    duration: 1.8,
                    delay: star.delay,
                    times: [0, 0.2, 0.5, 0.75, 1],
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255,255,220,0.8)`,
                  }}
                />
              ))}

              {/* ── Shooting Stars ────────────────────────────── */}
              {SHOOTING_STARS.map((ss) => (
                <motion.div
                  key={ss.id}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: ["-0%", "-30vw"],
                    y: ["0%", "25vh"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: ss.delay,
                    ease: "easeIn",
                    opacity: { times: [0, 0.1, 0.7, 1] },
                  }}
                  style={{
                    position: "absolute",
                    left: `${ss.startX}%`,
                    top: `${ss.startY}%`,
                    width: 60,
                    height: 2,
                    borderRadius: 2,
                    background:
                      "linear-gradient(90deg, rgba(255,255,220,0.0) 0%, rgba(255,255,180,1) 100%)",
                    transform: "rotate(35deg)",
                    transformOrigin: "right center",
                  }}
                />
              ))}

              {/* ── Crescent Moon ─────────────────────────────── */}
              <motion.svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                role="img"
                aria-label="Moon Knight crescent moon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.2, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.0,
                  times: [0, 0.55, 1],
                  ease: "easeInOut",
                }}
              >
                <circle cx="90" cy="90" r="70" fill="white" />
                <circle cx="120" cy="70" r="58" fill="black" />
              </motion.svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Moon Knight Toggle Button ────────────────────────────────────────────────

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  const [spinning, setSpinning] = useState(false);
  const [toDay, setToDay] = useState(false);

  const handleClick = () => {
    const nextIsDay = isDark; // currently dark → toggling to day
    setToDay(nextIsDay);
    setSpinning(true);
    onToggle();
    setTimeout(() => setSpinning(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      data-ocid="nav.toggle"
      className={[
        "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
        isDark
          ? "bg-gray-900 animate-moon-pulse"
          : "bg-amber-50 animate-sun-pulse",
      ].join(" ")}
    >
      <motion.div
        animate={{
          rotate: spinning ? (toDay ? 360 : 180) : 0,
        }}
        transition={{ duration: toDay ? 1.5 : 1.0, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-slate-200" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
      {/* Flash overlay on click */}
      <AnimatePresence>
        {spinning && (
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundColor: toDay
                ? "rgba(253, 230, 138, 0.9)"
                : "rgba(255,255,255,0.9)",
            }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Home,
    title: "Residential Construction",
    desc: "From compact apartments to sprawling bungalows, we build homes that reflect your lifestyle and stand the test of time.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    desc: "Office buildings, retail spaces, and industrial facilities — delivered on schedule with precision engineering.",
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    desc: "Breathe new life into existing structures. We handle everything from interior upgrades to full structural overhauls.",
  },
];

const STATS = [
  { value: "18+", label: "Years of Experience" },
  { value: "250+", label: "Projects Completed" },
  { value: "1.5M+", label: "Sq. Ft. Built" },
  { value: "1200+", label: "Happy Clients" },
];

const PROJECTS = [
  {
    name: "Residential Complex",
    location: "Chennai",
    img: "/assets/generated/project-residential-chennai.dim_600x400.jpg",
    tag: "Residential",
  },
  {
    name: "Commercial Hub",
    location: "Coimbatore",
    img: "/assets/generated/project-commercial-coimbatore.dim_600x400.jpg",
    tag: "Commercial",
  },
  {
    name: "Villa Project",
    location: "Madurai",
    img: "/assets/generated/project-villa-madurai.dim_600x400.jpg",
    tag: "Villa",
  },
  {
    name: "IT Park",
    location: "Trichy",
    img: "/assets/generated/project-itpark-trichy.dim_600x400.jpg",
    tag: "Commercial",
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xs transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 flex-shrink-0"
          onClick={() => scrollTo("#home")}
          data-ocid="nav.link"
        >
          <img
            src="/assets/rba_logo_1-019d3f82-ea8f-7791-a2e5-575934f7bd2f.png"
            alt="Rathore Brothers Associates Logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest leading-none">
              Est. 2006
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-brand dark:hover:text-brand transition-colors duration-200"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop right side: phone + toggle */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919171932625"
            className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            data-ocid="nav.link"
          >
            <Phone className="w-4 h-4" />
            +91 91719 32625
          </a>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        {/* Mobile: toggle + menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            type="button"
            className="p-2 rounded text-gray-700 dark:text-gray-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-brand dark:hover:text-brand border-b border-gray-100 dark:border-gray-800 transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+919171932625"
                className="flex items-center gap-2 py-3 px-2 text-sm font-semibold text-brand"
              >
                <Phone className="w-4 h-4" />
                +91 91719 32625
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-construction.dim_1400x800.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-4"
        >
          Crafting Landmarks with Precision and Excellence.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6"
        >
          Building Your
          <br />
          <span className="text-brand">Dreams</span> Since 2006
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 font-medium"
        >
          Rathore Brothers Associates delivers exceptional residential and
          commercial projects defined by quality, innovation, and superior
          craftsmanship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            type="button"
            size="lg"
            className="bg-brand hover:bg-brand-dark text-white font-bold uppercase tracking-widest px-8 py-6 text-sm rounded-md shadow-lg transition-all"
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            Explore Our Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 font-bold uppercase tracking-widest px-8 py-6 text-sm rounded-md transition-all"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-[#F3F3F3] dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-gray-100">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-8 flex flex-col"
              data-ocid={`services.card.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-lg bg-brand/10 flex items-center justify-center mb-6">
                <svc.icon className="w-7 h-7 text-brand" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-3">
                {svc.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                {svc.desc}
              </p>
              <button
                type="button"
                className="mt-6 flex items-center gap-1 text-brand text-sm font-semibold hover:gap-2 transition-all"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/assets/generated/about-construction-site.dim_700x600.jpg"
              alt="Rathore Brothers Associates construction site"
              className="rounded-lg w-full h-[420px] object-cover shadow-card"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand text-white rounded-lg p-6 shadow-lg hidden sm:block">
              <p className="text-4xl font-black">18+</p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-gray-100 mb-6">
              About Rathore Brothers Associates
            </h2>
            <div className="w-16 h-1 bg-brand mb-6" />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Founded in 2006, Rathore Brothers Associates has grown to become
              one of Tamil Nadu's most trusted names in the construction
              industry. Headquartered in Chennai, we serve clients across the
              state — from Coimbatore to Trichy, Madurai to Salem.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              With a team of experienced engineers, architects, and project
              managers, we bring your vision to life on time and within budget.
              Our commitment to quality craftsmanship and transparent
              communication has earned us over 1200 satisfied clients in nearly
              two decades.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-4 bg-[#F3F3F3] dark:bg-gray-800 rounded-lg transition-colors duration-300"
                  data-ocid={`about.card.${i + 1}`}
                >
                  <p className="text-2xl font-black text-brand">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = PROJECTS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  // Visible count based on screen (handled via CSS)
  return (
    <section
      id="projects"
      className="py-20 bg-[#F3F3F3] dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Our Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-gray-100">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4" />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {PROJECTS.map((proj, i) => (
                <div
                  key={proj.name}
                  className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/3"
                  style={{ minWidth: "100%" }}
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 mx-2">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={proj.img}
                        alt={`${proj.name} – ${proj.location}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {proj.tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide mb-1">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" /> {proj.location}, Tamil
                        Nadu
                      </p>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-1 text-brand text-xs font-bold uppercase tracking-wider border border-brand rounded py-2 hover:bg-brand hover:text-white transition-colors duration-200"
                        data-ocid={`projects.button.${i + 1}`}
                      >
                        View Project <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:bg-brand hover:text-white transition-colors duration-200"
            data-ocid="projects.pagination_prev"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:bg-brand hover:text-white transition-colors duration-200"
            data-ocid="projects.pagination_next"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.name}
              type="button"
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-brand scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-brand/50"}`}
              aria-label={`Go to slide ${i + 1}`}
              data-ocid={"projects.toggle"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="contact.panel"
    >
      <div>
        <Label
          htmlFor="contact-name"
          className="text-gray-300 text-xs uppercase tracking-wider mb-1 block"
        >
          Your Name
        </Label>
        <Input
          id="contact-name"
          placeholder="John Kumar"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand"
          data-ocid="contact.input"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="contact-email"
            className="text-gray-300 text-xs uppercase tracking-wider mb-1 block"
          >
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand"
            data-ocid="contact.input"
          />
        </div>
        <div>
          <Label
            htmlFor="contact-phone"
            className="text-gray-300 text-xs uppercase tracking-wider mb-1 block"
          >
            Phone
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+91 63801 25194"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand"
            data-ocid="contact.input"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="contact-message"
          className="text-gray-300 text-xs uppercase tracking-wider mb-1 block"
        >
          Message
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your project..."
          rows={5}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand resize-none"
          data-ocid="contact.textarea"
        />
      </div>
      {submitted && (
        <div
          className="flex items-center gap-2 text-green-400 text-sm"
          data-ocid="contact.success_state"
        >
          <CheckCircle2 className="w-4 h-4" />
          Message received! We'll contact you shortly.
        </div>
      )}
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-brand hover:bg-brand-dark text-white font-bold uppercase tracking-widest py-6 text-sm rounded-md shadow transition-all"
        data-ocid="contact.submit_button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

// ─── Our Clients ──────────────────────────────────────────────────────────────

const CLIENTS = [
  {
    name: "Shapoorji Pallonji",
    logo: "/assets/shapoorji-pallonji-group-logo-hd-png-download-019d4445-3276-7088-85bb-a84a5713f726.png",
  },
  {
    name: "Puravankara",
    logo: "/assets/puravankara-group-logo_1-019d4445-32ba-71b3-a334-a3c8840fdcc3.jpg",
  },
  {
    name: "Mahindra World City",
    logo: "/assets/mahindra-world-city_1-019d4445-32b5-72cb-9df4-645ef08be2be.jpg",
  },
  {
    name: "Mahindra Lifespaces",
    logo: "/assets/mahindra-lifespaces-logo-hd-019d4445-328f-779e-8a9d-9edfa5d69d59.png",
  },
  {
    name: "TVS Emerald",
    logo: "/assets/tvs-emerald_1-019d4445-333f-755c-97d1-e7b8a5680a69.png",
  },
  {
    name: "Tata Value Homes",
    logo: "/assets/tata_value_homes_imgupscaler.ai_enhancer_2k-019d4445-33bf-7581-a53f-def7aa166b92.png",
  },
  {
    name: "S&P",
    logo: "/assets/a_and_p-019d4445-37c0-727b-b285-5049237d29d6.jpg",
  },
  {
    name: "Appaswamy Real Estates",
    logo: "/assets/image-019d4445-37d8-70b6-b3cb-a9cbc4d062f9.png",
  },
  {
    name: "KG Developers",
    logo: "/assets/kg_imgupscaler.ai_enhancer_2k-019d4445-3cd7-776e-825d-98f27ef0e454.png",
  },
  {
    name: "Coromandel Engineering",
    logo: "/assets/coromandel-engineering-logo-png_seeklogo-450055_2-019d4445-3cd0-72ab-a731-e6278e3b6fc3.png",
  },
  {
    name: "VGN",
    logo: "/assets/vgn_imgupscaler.ai_enhancer_2k-019d4445-3eb5-77b9-a229-5867d24f692c.png",
  },
  {
    name: "Hiranandani",
    logo: "/assets/hiranandani-logo_imgupscaler.ai_beta_2k-019d4445-3f44-721e-be4b-f35cc8a60b52.jpg",
  },
];

function OurClients() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section
      id="clients"
      className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
            OUR CLIENTS
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Trusted by India&apos;s Leading Developers
          </p>
          <div className="mt-4 mx-auto w-16 h-1 bg-amber-500 rounded" />
        </div>
        <div className="relative overflow-hidden" data-ocid="clients.list">
          <div className="flex animate-marquee gap-6 w-max">
            {doubled.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                data-ocid={`clients.item.${(i % CLIENTS.length) + 1}`}
                className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm w-44"
              >
                <div className="w-36 h-20 flex items-center justify-center p-2">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "#3a3028" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Reach Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />

          {/* Contact Info */}
          <div className="text-white space-y-8">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Address
                    </p>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      NO. 49 Devarajan Street, Devadoss Nagar,
                      <br />
                      Poonamallee, Chennai – 600056, Tamil Nadu, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+919171932625"
                      className="text-gray-200 text-sm hover:text-brand transition-colors"
                    >
                      +91 91719 32625
                    </a>
                    <br />
                    <a
                      href="tel:+916380125194"
                      className="text-gray-200 text-sm hover:text-brand transition-colors"
                    >
                      +91 63801 25194
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:rathorebro@gmail.com"
                      className="text-gray-200 text-sm hover:text-brand transition-colors"
                    >
                      rathorebro@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Working Hours
              </p>
              <div className="space-y-2 text-sm text-gray-200">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/rba_logo_1-019d3f82-ea8f-7791-a2e5-575934f7bd2f.png"
              alt="Rathore Brothers Associates"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Building Tamil Nadu's skyline since 2006 with quality, integrity,
              and craftsmanship.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-400 hover:text-brand transition-colors flex items-center gap-1"
                    data-ocid="nav.link"
                  >
                    <ChevronRight className="w-3 h-3" /> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((svc) => (
                <li key={svc.title}>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" /> {svc.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              Contact Info
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                NO. 49 Devarajan Street, Devadoss Nagar, Poonamallee, Chennai –
                600056
              </p>
              <p className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 91719 32625
              </p>
              <p className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                rathorebro@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © 2006–{new Date().getFullYear()} Rathore Brothers Associates. All
            Rights Reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { isDark, setIsDark } = useDarkMode();
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayToDay, setOverlayToDay] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);

  const handleToggleTheme = () => {
    const nextIsDay = isDark; // currently dark → going to day
    if (hasToggled) {
      setOverlayToDay(nextIsDay);
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 2200);
    }
    setHasToggled(true);
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <MoonKnightOverlay visible={showOverlay} toDay={overlayToDay} />
      <Header isDark={isDark} onToggleTheme={handleToggleTheme} />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <OurClients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
