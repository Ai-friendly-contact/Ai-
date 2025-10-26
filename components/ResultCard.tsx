import React from 'react';
import { DiagnosisResult } from '../types';

interface ResultCardProps {
  result: DiagnosisResult;
  onRestart: () => void;
}

const formatText = (text: string) => {
    return text.split('\n').map((paragraph, pIndex) => {
      if (paragraph.trim() === '') return null;
      const parts = paragraph.split(/(\*\*.*?\*\*)/g).filter(part => part);
      return (
        <p key={pIndex} className="mb-4 last:mb-0 text-lg leading-relaxed">
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      );
    }).filter(Boolean);
};


const ResultCard: React.FC<ResultCardProps> = ({ result, onRestart }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-xl font-medium text-gray-600">あなたの会社のAI導入タイプは...</p>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600 py-2">
          {result.type}
        </h2>
      </div>

      <div className="text-gray-700 space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-lime-300 pb-2">
            特徴と解説
          </h3>
          <div className="text-gray-700 space-y-4">{formatText(result.comment)}</div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-lime-300 pb-2">
            次の一歩
          </h3>
          <div className="text-gray-700 space-y-4">{formatText(result.nextStep)}</div>
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-lime-50 rounded-lg border-2 border-dashed border-lime-200 text-center">
        <h3 className="text-xl font-bold text-gray-800">LINE登録でメール作成アシスタントの「メル太」を無料プレゼント！</h3>
        <p className="text-gray-600 mt-2 mb-4">業務改善をまずは実感！</p>
        <a 
          href="https://lin.ee/wCVVvvH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16.22,8.65a1.3,1.3,0,0,0-1.1-.55,1.17,1.17,0,0,0-.87.35l-.22.22a.56.56,0,0,1-.83,0l-.33-.33a.56.56,0,0,1,0-.83l.22-.22a1.2,1.2,0,0,0,.35-.87,1.3,1.3,0,0,0-.55-1.1A1.17,1.17,0,0,0,12.52,5H8.8A3.48,3.48,0,0,0,5.32,8.42v6.52A3.48,3.48,0,0,0,8.8,18.42h6.52a3.48,3.48,0,0,0,3.48-3.48V11.2A3.42,3.42,0,0,0,16.22,8.65ZM12.39,15.55H10.11a.57.57,0,0,1-.57-.57v-3a.57.57,0,0,1,.57-.57H10V10.8a.56.56,0,0,1,.56-.56h.76a.56.56,0,0,1,.56.56v4.18A.57.57,0,0,1,12.39,15.55Zm3.14-3.55a.56.56,0,0,1-.56.56H14V10.38a.56.56,0,0,1,.56-.56h.76a.56.56,0,0,1,.56.56Z"></path></svg>
          <span>LINEで「メル太」を無料で受け取る</span>
        </a>
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://forms.gle/Vx74Rgp3CL4n2orK6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          メールで相談する
        </a>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          ご意見・ご感想をお聞かせください
        </h3>
        <div className="w-full h-[1000px] overflow-hidden rounded-lg border border-gray-300">
          <iframe 
             src="https://docs.google.com/forms/d/e/1FAIpQLScXa8bvMbrs0iBNPEMwhOcBjgTcBDY6_vbaANFijUncFHBHOA/viewform?embedded=true" 
             width="100%" 
             height="100%" 
             frameBorder="0" 
             marginHeight={0} 
             marginWidth={0}
             className="w-full h-full"
          >
            読み込んでいます…
          </iframe>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
};

export default ResultCard;