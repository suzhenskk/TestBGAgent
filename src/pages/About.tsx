import { motion } from 'framer-motion';
import { profile } from '../data/projects';

export const About = () => {
  return (
    <div className="container mx-auto px-6 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 shadow-lg"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-light text-gray-500 mb-12"
        >
          {profile.role}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg text-gray-700 max-w-none leading-relaxed font-light"
        >
          <p className="mb-6">{profile.bio}</p>
          <p>
            我相信设计不仅仅是外观，更是功能的延伸。在每一个项目中，我都致力于寻找形式与功能的完美平衡，通过极简的视觉语言传达核心价值。
          </p>
          <p>
            作为一名全栈开发者，我能够从概念设计到最终代码实现全流程把控，确保每一个像素、每一个交互都精准还原设计初衷。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-16 border-t border-gray-100"
        >
          <h3 className="text-xl font-semibold mb-8">Connect</h3>
          <div className="flex flex-wrap gap-8">
            {profile.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-600 hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="text-lg text-gray-600 hover:text-black hover:underline underline-offset-4 transition-colors"
            >
              Email Me
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
