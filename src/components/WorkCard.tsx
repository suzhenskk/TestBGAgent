import React from 'react';

interface WorkCardProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
  onClick: (id: string) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ id, title, description, images, categories, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;