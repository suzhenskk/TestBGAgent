import { useState } from 'react';
import { Volume2, ArrowLeft, ArrowRight } from 'lucide-react';

interface Word {
  word: string;
  image: string;
  audio: string;
}

export const Vocabulary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const words: Word[] = [
    { word: 'Cat', image: 'cat.png', audio: 'cat.mp3' },
    { word: 'Dog', image: 'dog.png', audio: 'dog.mp3' },
    { word: 'Bird', image: 'bird.png', audio: 'bird.mp3' },
    { word: 'Fish', image: 'fish.png', audio: 'fish.mp3' },
  ];

  const currentWord = words[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? words.length - 1 : prev - 1));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    // In a real app, this would play the audio file
    console.log(`Playing audio for ${currentWord.word}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Animals Vocabulary</h3>
        
        {/* Flashcard */}
        <div className="flex justify-center my-8" style={{ perspective: '1000px' }}>
          <div 
            className={`
              w-64 h-64 rounded-xl shadow-md relative
              transition-transform duration-600 ease-in-out
              ${isFlipped ? 'transform rotate-y-180' : ''}
            `}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="absolute inset-0 bg-blue-50 rounded-xl flex flex-col items-center justify-center p-4" style={{ backfaceVisibility: 'hidden', transition: 'transform 0.6s' }}>
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl">🐱</span>
              </div>
              <p className="text-sm text-gray-500">Tap to see the word</p>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 bg-white rounded-xl flex flex-col items-center justify-center p-4" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', transition: 'transform 0.6s' }}>
              <h4 className="text-2xl font-bold text-blue-600 mb-4">{currentWord.word}</h4>
              <button 
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio();
                }}
              >
                <Volume2 size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            onClick={handlePrevious}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {words.length}
          </span>
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            onClick={handleNext}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
        </div>
        <div className="mt-3 flex justify-between text-sm text-gray-500">
          <span>Words Learned: 2/4</span>
          <span>50% Complete</span>
        </div>
      </div>

      {/* Next Module */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Next Module</h3>
        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Phonics: Letter A</h4>
            <p className="text-sm text-gray-500">Learn the sound of letter A</p>
          </div>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};