import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { profile } from '../data/projects';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm" />
      <div className="container mx-auto px-6 h-16 relative flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight text-gray-900 hover:text-black transition-colors z-10"
        >
          {profile.name}
        </Link>
        
        <div className="flex items-center space-x-8 z-10">
          <NavLink to="/" isActive={isHome}>作品</NavLink>
          <NavLink to="/about" isActive={location.pathname === '/about'}>关于</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "text-sm font-medium transition-colors relative py-1",
        isActive ? "text-black" : "text-gray-500 hover:text-gray-900"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute left-0 right-0 bottom-0 h-px bg-black"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};
