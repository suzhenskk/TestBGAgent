import { Trophy, BarChart2 } from 'lucide-react';
import { useState } from 'react';

export const Progress = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = [
    {
      id: 1,
      name: 'First Word',
      description: 'Learned your first English word',
      earnedAt: 'Today',
      icon: '🌟',
    },
    {
      id: 2,
      name: 'Vocabulary Builder',
      description: 'Learned 10 new words',
      earnedAt: 'Yesterday',
      icon: '📚',
    },
    {
      id: 3,
      name: 'Game Master',
      description: 'Won your first game',
      earnedAt: '2 days ago',
      icon: '🎮',
    },
  ];

  const progressData = {
    vocabulary: 75,
    phonics: 45,
    grammar: 30,
    reading: 60,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
        <p className="mb-4">See how well you're doing!</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border p-1 flex">
        <button
          className={`flex-1 py-2 rounded-lg font-medium ${activeTab === 'achievements' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('achievements')}
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy size={16} />
            Achievements
          </div>
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium ${activeTab === 'reports' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('reports')}
        >
          <div className="flex items-center justify-center gap-2">
            <BarChart2 size={16} />
            Progress Reports
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeTab === 'achievements' ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Your Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <span className="text-xl">{achievement.icon}</span>
                    </div>
                    <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <span className="text-xs text-gray-500">Earned: {achievement.earnedAt}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                You have earned 3 out of 10 achievements. Keep learning to unlock more!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-800">Skill Progress</h3>
            <div className="space-y-4">
              {Object.entries(progressData).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{skill}</span>
                    <span className="text-sm text-gray-600">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${value}%`,
                        backgroundColor: skill === 'vocabulary' ? '#4A90E2' : 
                                      skill === 'phonics' ? '#7ED321' : 
                                      skill === 'grammar' ? '#F5A623' : '#9013FE'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Weekly Progress</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">{day}</span>
                      <div className="w-8 h-16 bg-gray-200 rounded-full relative">
                        <div 
                          className="absolute bottom-0 w-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                          style={{ 
                            height: `${Math.random() * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};