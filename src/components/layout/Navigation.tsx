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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50"
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-logo gold-text hover:opacity-80 transition-opacity">
            Portfolio
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "text-nav transition-all duration-300 relative",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
            <span className="block w-6 h-0.5 bg-foreground transition-transform group-open:rotate-45 group-open:translate-y-2" />
            <span className="block w-6 h-0.5 bg-foreground transition-opacity group-open:opacity-0" />
            <span className="block w-6 h-0.5 bg-foreground transition-transform group-open:-rotate-45 group-open:-translate-y-2" />
          </div>
        </summary>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
        >
          <ul className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "block body-default font-medium py-2 transition-colors",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
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
