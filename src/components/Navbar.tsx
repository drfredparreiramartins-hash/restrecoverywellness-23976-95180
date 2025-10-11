
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.error(`Error scrolling to ${sectionId}:`, error);
      // Fallback for cross-origin issues
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({top: yOffset, behavior: 'smooth'});
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-purple-900 border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl font-bold text-white hover:text-purple-300 transition-colors cursor-pointer">
              Dr. Frederick Parreira
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#about');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-medium text-white/80 hover:text-white transition-colors"
          >
            Sobre
          </a>
          <a 
            href="#credentials"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#credentials');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-medium text-white/80 hover:text-white transition-colors"
          >
            Formação
          </a>
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-medium text-white/80 hover:text-white transition-colors"
          >
            Contato
          </a>
          <a 
            href="https://instagram.com/drfredmartinsjf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <Instagram size={20} />
            Instagram
          </a>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button 
            className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-6"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Agende Agora
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg w-full shadow-lg py-6 border-t border-white/10 animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-2 px-4">
            <a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 transition-colors text-lg block"
            >
              Sobre
            </a>
            <a 
              href="#credentials"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#credentials');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 transition-colors text-lg block"
            >
              Formação
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 transition-colors text-lg block"
            >
              Contato
            </a>
            <a 
              href="https://instagram.com/drfredmartinsjf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 transition-colors text-lg flex items-center gap-2"
            >
              <Instagram size={20} />
              Instagram
            </a>
            <Button 
              className="bg-white text-slate-900 hover:bg-white/90 rounded-full w-full mt-2 py-4 text-lg"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Agende Agora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
