import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { projects, profile } from '../data/projects';
import { ArrowDown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const Home = () => {
  return (
    <div className="container mx-auto px-6 py-20 lg:py-32">
      <motion.section 
        className="max-w-4xl mx-auto text-center mb-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
          以精准与匠心，<br />雕琢数字体验。
        </h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          我是 {profile.name}，一名跨界设计师与开发者。专注于打造直观、极简且富有影响力的数字产品。
        </p>
        
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <ArrowDown className="animate-bounce text-gray-400 w-6 h-6" />
        </motion.div>
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
