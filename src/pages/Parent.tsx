import { User, BarChart2, Settings, Plus } from 'lucide-react';
import { useState } from 'react';

export const Parent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const children = [
    {
      id: 1,
      name: 'Alex',
      age: 7,
      level: 'Beginner',
      progress: 65,
    },
    {
      id: 2,
      name: 'Emma',
      age: 5,
      level: 'Pre-Beginner',
      progress: 40,
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
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Parent Dashboard</h2>
        <p className="mb-4">Monitor your child's learning progress</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border p-1 flex">
        <button
          className={`flex-1 py-2 rounded-lg font-medium ${activeTab === 'overview' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="flex items-center justify-center gap-2">
            <BarChart2 size={16} />
            Progress Overview
          </div>
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium ${activeTab === 'manage' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('manage')}
        >
          <div className="flex items-center justify-center gap-2">
            <User size={16} />
            Manage Children
          </div>
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('settings')}
        >
          <div className="flex items-center justify-center gap-2">
            <Settings size={16} />
            Settings
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Child Progress</h3>
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{child.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{child.name}</h4>
                          <p className="text-sm text-gray-500">Age: {child.age} | Level: {child.level}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{child.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${child.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Skill Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(progressData).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{skill}</span>
                      <span className="text-sm text-gray-600">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500 ease-out"
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
            </div>
          </div>
        ) : activeTab === 'manage' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Manage Children</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors">
                <Plus size={16} />
                Add Child
              </button>
            </div>
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{child.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{child.name}</h4>
                        <p className="text-sm text-gray-500">Age: {child.age} | Level: {child.level}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-800">Settings</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Account Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border rounded-md" 
                      value="parent@example.com" 
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border rounded-md" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Learning Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Learning Goal</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>10 minutes</option>
                      <option selected>15 minutes</option>
                      <option>20 minutes</option>
                      <option>30 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="email" checked />
                        <label htmlFor="email" className="text-sm text-gray-700">Email Notifications</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="progress" checked />
                        <label htmlFor="progress" className="text-sm text-gray-700">Progress Reports</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};