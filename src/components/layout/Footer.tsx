import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="heading-small gold-text mb-2">
              Let's work together
            </p>
            <p className="body-small">
              Open to new opportunities and collaborations.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Link 
              to="/contact" 
              className="text-nav text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <a 
              href="https://www.linkedin.com/in/satya-sai-pasupuleti-7090pj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nav text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:satyasai7090@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nav text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        
        <div className="divider mt-12 mb-6" />
        
        <p className="body-small">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
