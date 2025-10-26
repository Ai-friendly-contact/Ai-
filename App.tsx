import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { DiagnosisResult } from './types';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import Spinner from './components/Spinner';
import { getLocalDiagnosis } from './services/localDiagnosisService';

type QuizState = 'start' | 'in-progress' | 'loading' | 'finished' | 'error';

const AillyLogo = () => (
  <div className="text-center mb-6">
    <div className="text-7xl font-black text-gray-800 tracking-tight">
        Ailly
    </div>
    <p className="text-sm text-gray-600 mt-2 tracking-wide">
        Ailly（アイリー）
        <span className="hidden sm:inline">｜</span>
        <br className="sm:hidden" />
        AI × クリエイティブ × DX支援をワンストップで！
    </p>
  </div>
);

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setError(null);
    setQuizState('in-progress');
  };

  const handleAnswer = useCallback((answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('loading');
      // 診断結果表示までの体験向上のため、少し待機時間を設ける
      setTimeout(() => {
        try {
          const diagnosisResult = getLocalDiagnosis(newAnswers);
          setResult(diagnosisResult);
          setQuizState('finished');
        } catch (err) {
          console.error("Diagnosis failed:", err);
          setError("診断結果の生成中にエラーが発生しました。もう一度お試しください。");
          setQuizState('error');
        }
      }, 1500); // 1.5秒のローディング
    }
  }, [answers, currentQuestionIndex]);
  
  const currentQuestion = useMemo(() => QUESTIONS[currentQuestionIndex], [currentQuestionIndex]);

  const renderContent = () => {
    switch (quizState) {
      case 'start':
        return (
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200">
            <AillyLogo />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600 mb-4">
              3分でわかる！
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">あなたの会社の<br className="sm:hidden" />AI導入タイプ診断</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              いくつかの簡単な質問に答えるだけで、あなたの会社に最適なAI導入の進め方がわかります。
              <br />
              性格診断のように、気軽な気持ちで試してみてください。
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
            >
              診断スタート
            </button>
          </div>
        );
      case 'in-progress':
        return (
          <QuestionCard
            question={currentQuestion.text}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
          />
        );
      case 'loading':
        return (
          <div className="text-center p-8">
            <Spinner />
            <p className="text-2xl mt-4 font-semibold text-gray-600 animate-pulse">あなたの会社を分析中...</p>
          </div>
        );
      case 'finished':
        return result && <ResultCard result={result} onRestart={handleStart} />;
      case 'error':
        return (
            <div className="text-center p-8 bg-red-50 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200">
                <h2 className="text-3xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
                <p className="text-lg text-red-800 mb-6">{error}</p>
                <button
                    onClick={handleStart}
                    className="px-8 py-3 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
                >
                    もう一度試す
                </button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-lime-50 via-white to-amber-50">
      <main className="w-full max-w-3xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;