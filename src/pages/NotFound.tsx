import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center glass p-12 rounded-3xl"
      >
        <h1 className="text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          404
        </h1>
        <p className="text-2xl mb-8 font-light text-gray-600 dark:text-gray-300">
          Looks like this page evaporated.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};
