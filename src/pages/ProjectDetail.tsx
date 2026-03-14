import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">{project.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium uppercase tracking-wide">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
        className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
      >
        <img src={project.coverImage} alt={project.title} className="w-full h-auto object-cover max-h-[80vh]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <p className="text-xl leading-relaxed text-gray-700 font-light">
            {project.description}
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {project.images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img src={img} alt={`${project.title} detail ${index + 1}`} className="w-full h-auto" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
