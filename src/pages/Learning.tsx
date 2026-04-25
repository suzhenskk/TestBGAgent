import { Link } from 'react-router-dom';
import { Book, ChevronRight } from 'lucide-react';

export const Learning = () => {
  const modules = [
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      description: 'Learn new words with flashcards and games',
      icon: '📚',
      color: 'bg-blue-100 text-blue-600',
      progress: 75,
    },
    {
      id: 'phonics',
      title: 'Phonics',
      description: 'Learn letter sounds and pronunciation',
      icon: '🔤',
      color: 'bg-green-100 text-green-600',
      progress: 45,
    },
    {
      id: 'grammar',
      title: 'Grammar',
      description: 'Learn basic grammar rules',
      icon: '📝',
      color: 'bg-yellow-100 text-yellow-600',
      progress: 30,
    },
    {
      id: 'reading',
      title: 'Reading',
      description: 'Read fun stories and practice comprehension',
      icon: '📖',
      color: 'bg-purple-100 text-purple-600',
      progress: 60,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Learning Modules</h2>
        <p className="mb-4">Choose a module to start learning English</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Link 
            key={module.id} 
            to={`/learning/${module.id}`}
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${module.color}`}>
                  <span className="text-2xl">{module.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{module.title}</h3>
                  <p className="text-sm text-gray-500">{module.description}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ease-out`}
                style={{ 
                  width: `${module.progress}%`,
                  backgroundColor: module.color.split(' ')[0].replace('bg-', '') 
                }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {module.progress}% Complete
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};