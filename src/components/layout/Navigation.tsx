import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/documentation-samples", label: "Samples" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#d4af37]/10"
      style={{
        background: "rgba(26, 26, 46, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="transition-colors"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #d4af37 0%, #f5d670 50%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 relative",
                      location.pathname === link.href
                        ? "text-[#d4af37]"
                        : "text-gray-400 hover:text-[#d4af37]/80"
                    )}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
}

function MobileNav() {
  const location = useLocation();
  
  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <details className="group">
        <summary className="list-none cursor-pointer p-2">
          <div className="flex flex-col gap-1.5">
            <span className="block w-6 h-0.5 bg-gray-300 transition-transform group-open:rotate-45 group-open:translate-y-2" />
            <span className="block w-6 h-0.5 bg-gray-300 transition-opacity group-open:opacity-0" />
            <span className="block w-6 h-0.5 bg-gray-300 transition-transform group-open:-rotate-45 group-open:-translate-y-2" />
          </div>
        </summary>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 border-b border-[#d4af37]/10 shadow-lg"
          style={{ background: "rgba(26, 26, 46, 0.95)", backdropFilter: "blur(16px)" }}
        >
          <ul className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "block text-base font-medium py-2 transition-colors",
                    location.pathname === link.href
                      ? "text-[#d4af37]"
                      : "text-gray-400"
                  )}
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </details>
    </div>
  );
}
