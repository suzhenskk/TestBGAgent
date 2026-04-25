import { useState } from 'react';
import { Book, Gamepad2, Trophy, Play, ChevronRight, Calendar } from 'lucide-react';

interface DashboardProps {
  childName: string;
}

export const Dashboard = ({ childName }: DashboardProps) => {
  const [progress, setProgress] = useState({
    vocabulary: 75,
    phonics: 45,
    grammar: 30,
    reading: 60,
  });

  const modules = [
    { name: 'Vocabulary', icon: Book, color: 'bg-blue-100 text-blue-600', progress: progress.vocabulary },
    { name: 'Phonics', icon: Book, color: 'bg-green-100 text-green-600', progress: progress.phonics },
    { name: 'Grammar', icon: Book, color: 'bg-yellow-100 text-yellow-600', progress: progress.grammar },
    { name: 'Reading', icon: Book, color: 'bg-purple-100 text-purple-600', progress: progress.reading },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Hi {childName}!</h2>
        <p className="mb-4">Ready to learn English today?</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors">
          <Play size={18} />
          Start Learning
        </button>
      </div>

      {/* Daily Challenge */}
      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Daily Challenge</h3>
            <p className="text-sm text-yellow-600">Complete 3 vocabulary words</p>
          </div>
          <Calendar size={24} className="text-yellow-500" />
        </div>
        <div className="w-full bg-yellow-200 rounded-full h-2.5">
          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '33%' }}></div>
        </div>
        <div className="mt-3 flex justify-between text-xs text-yellow-600">
          <span>0/3 words</span>
          <span>100 XP reward</span>
        </div>
      </div>

      {/* Learning Modules */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Learning Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border p-4 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${module.color} transform transition-transform duration-300 hover:scale-110`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-gray-800">{module.name}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 transition-colors duration-300 hover:text-gray-600" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${module.progress}%`,
                      backgroundColor: module.color.split(' ')[0].replace('bg-', '') 
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {module.progress}% Complete
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="p-3 rounded-full bg-green-100 text-green-600 transform transition-transform duration-300 hover:scale-110">
              <Gamepad2 size={24} />
            </div>
            <span className="font-medium text-gray-800">Games</span>
          </button>
          <button className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 transform transition-transform duration-300 hover:scale-110">
              <Trophy size={24} />
            </div>
            <span className="font-medium text-gray-800">Achievements</span>
          </button>
        </div>
      </div>
    </div>
  );
};