import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/experience", label: "Experience & Skills" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="font-display text-xl font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            Portfolio
          </Link>
          
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 link-underline",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
}

function MobileNav() {
  const location = useLocation();
  
  return (
    <div className="md:hidden">
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
          className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
        >
          <ul className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "block text-base font-medium py-2 transition-colors",
                    location.pathname === link.href
                      ? "text-foreground"
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
