import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/project/${project.id}`} className="group block">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[4/3] mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </motion.div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium tracking-tight mb-1 group-hover:text-blue-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 font-light">{project.category}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          <ArrowRight className="text-blue-600 w-5 h-5" />
        </div>
      </div>
    </Link>
  );
};
