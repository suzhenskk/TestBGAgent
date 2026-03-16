import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  tags: string[];
}

export const ProjectCard = ({ id, title, subtitle, coverImage, tags }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full h-[500px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <Link to={`/project/${id}`} className="block w-full h-full relative z-10">
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 bg-white/5 dark:bg-black/20 rounded-2xl shadow-xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl"
        >
           {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
          
          {/* Content Container */}
          <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
            <div 
              style={{ transform: "translateZ(50px)" }}
              className="transition-transform duration-300 group-hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-3">
                 <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-medium text-white tracking-wider uppercase">
                  {subtitle}
                </span>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-lg">
                {title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-300 font-light border-b border-gray-500/50 pb-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute top-6 right-6">
              <motion.div 
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300"
                whileHover={{ rotate: 45 }}
              >
                <ArrowUpRight size={24} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
