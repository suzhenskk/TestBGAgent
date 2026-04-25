import React, { useState } from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
  technologies: string;
  link: string;
  createdAt: string;
}

interface ModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ work, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !work) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Carousel */}
        <div className="relative h-80 md:h-96">
          <img 
            src={work.images[currentImageIndex]} 
            alt={work.title} 
            className="w-full h-full object-cover"
          />
          {work.images.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                onClick={prevImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                onClick={nextImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {work.images.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Work Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{work.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {work.categories.map((category, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{work.description}</p>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Technologies</h3>
            <p className="text-gray-700">{work.technologies}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Created</h3>
            <p className="text-gray-700">{new Date(work.createdAt).toLocaleDateString()}</p>
          </div>
          {work.link && (
            <a 
              href={work.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;