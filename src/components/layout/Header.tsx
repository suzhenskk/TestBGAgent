import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="glass-nav px-6 py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight z-50 mix-blend-difference text-white">
          Alex.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Work</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <a href="mailto:hello@alexchen.design" className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden z-50 p-2 text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 dark:bg-black/80 z-40 flex flex-col items-center justify-center gap-8"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-medium">Work</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-2xl font-medium">About</Link>
            <a href="mailto:hello@alexchen.design" className="text-2xl font-medium">Contact</a>
          </motion.div>
        )}
      </div>
    </header>
  );
};
