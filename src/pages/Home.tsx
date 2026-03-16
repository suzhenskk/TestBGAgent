import { LiquidBackground } from '../components/liquid/LiquidBackground';
import { Header } from '../components/layout/Header';
import { ProjectCard } from '../components/project/ProjectCard';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import profileData from '../data/profile.json';
import { ArrowDown } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen w-full relative">
      <LiquidBackground />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl w-full z-10 text-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 mix-blend-overlay text-gray-900 dark:text-white opacity-90">
              Liquid <br /> Digital
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed glass p-6 rounded-2xl">
              {profileData.bio}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ArrowDown className="text-gray-500" />
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
            <span className="text-sm text-gray-500 uppercase tracking-widest hidden md:block">2023 — Present</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  subtitle={project.subtitle}
                  coverImage={project.coverImage}
                  tags={project.tags}
                />
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* About Teaser */}
        <section className="py-32 px-6 bg-white/50 dark:bg-black/50 backdrop-blur-3xl">
          <div className="container mx-auto max-w-4xl text-center">
             <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's craft the future together.</h2>
             <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
               I'm currently available for freelance projects and open to full-time opportunities.
               If you have a project that needs some liquid magic, let's talk.
             </p>
             <a 
               href={`mailto:${profileData.email}`}
               className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
             >
               Get in Touch
             </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Alex Chen. All rights reserved.</span>
            
            <div className="flex gap-6">
              {profileData.social.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.url} 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
