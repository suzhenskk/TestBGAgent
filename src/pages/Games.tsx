import { Gamepad2, Trophy } from 'lucide-react';

export const Games = () => {
  const games = [
    {
      id: 'word-matching',
      title: 'Word Matching',
      description: 'Match words with their pictures',
      icon: '🧩',
      color: 'bg-blue-100 text-blue-600',
      difficulty: 'Easy',
      xp: 50,
    },
    {
      id: 'spelling-bee',
      title: 'Spelling Bee',
      description: 'Practice spelling words correctly',
      icon: '🐝',
      color: 'bg-yellow-100 text-yellow-600',
      difficulty: 'Medium',
      xp: 75,
    },
    {
      id: 'memory-game',
      title: 'Memory Game',
      description: 'Remember and match word pairs',
      icon: '🎮',
      color: 'bg-green-100 text-green-600',
      difficulty: 'Easy',
      xp: 40,
    },
    {
      id: 'quiz-challenge',
      title: 'Quiz Challenge',
      description: 'Answer English questions quickly',
      icon: '❓',
      color: 'bg-purple-100 text-purple-600',
      difficulty: 'Hard',
      xp: 100,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Fun Games</h2>
        <p className="mb-4">Practice English while having fun!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm border p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${game.color} transform transition-transform duration-300 hover:scale-110`}>
                  <span className="text-2xl">{game.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{game.title}</h3>
                  <p className="text-sm text-gray-500">{game.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {game.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{game.xp} XP</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
              Play Now
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Scores</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Word Matching</h4>
                <p className="text-sm text-gray-500">Score: 9/10</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">+50 XP</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Spelling Bee</h4>
                <p className="text-sm text-gray-500">Score: 7/10</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">+75 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};