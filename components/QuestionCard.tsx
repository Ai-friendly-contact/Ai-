import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswer, questionNumber, totalQuestions }) => {
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-base text-gray-500">
          <span>質問 {questionNumber}/{totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-lime-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">{question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-4 bg-white hover:bg-lime-100 border border-gray-300 hover:border-lime-400 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-500 text-lg"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;