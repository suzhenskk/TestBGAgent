import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/projects';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-6 text-gray-500">
          {profile.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
              aria-label={link.label}
            >
              {link.platform === 'github' && <Github size={20} strokeWidth={1.5} />}
              {link.platform === 'twitter' && <Twitter size={20} strokeWidth={1.5} />}
              {link.platform === 'linkedin' && <Linkedin size={20} strokeWidth={1.5} />}
              {link.platform === 'instagram' && <span className="font-semibold text-sm">IG</span>}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-black transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
        <div className="text-xs text-gray-400 font-light tracking-wide">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
