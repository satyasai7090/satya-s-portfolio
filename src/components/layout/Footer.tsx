import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-display text-lg font-medium text-foreground mb-2">
              Let's work together
            </p>
            <p className="text-muted-foreground text-sm">
              Open to new opportunities and collaborations.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Link 
              to="/contact" 
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Contact
            </Link>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:hello@example.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        
        <div className="divider mt-12 mb-6" />
        
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
