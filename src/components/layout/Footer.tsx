import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer
      className="border-t border-[#d4af37]/10"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
    >
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p
              className="text-xl font-medium mb-2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #d4af37 0%, #f5d670 50%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let's work together
            </p>
            <p className="text-sm text-gray-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Open to new opportunities and collaborations.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Link 
              to="/contact" 
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Contact
            </Link>
            <a 
              href="https://www.linkedin.com/in/satya-sai-pasupuleti-7090pj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-[#d4af37] transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              LinkedIn
            </a>
            <a 
              href="mailto:satyasai7090@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-[#d4af37] transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Email
            </a>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#d4af37]/10 mt-12 mb-6" />
        
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
