import React, { useState, useEffect, useRef } from 'react';
import { IntroSelection } from './components/IntroSelection';
import { InstructionsScreen } from './components/InstructionsScreen';
import { PreparationScreen } from './components/PreparationScreen';
import { ExamCard, ExamCardHandle } from './components/ExamCard';
import { ResultsScreen } from './components/ResultsScreen';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ConfessionGuideScreen } from './components/ConfessionGuideScreen';
import { UserType, AppStage, Question } from './types';
import { YOUTH_QUESTIONS, ADULT_QUESTIONS, PRIEST_QUESTIONS, CHILD_QUESTIONS, GENERAL_CONFESSION_QUESTIONS } from './constants';
import { Undo2, X, Church, Check, X as XIcon, Shield, Leaf, Baby, Scroll } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<AppStage>('intro');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Ref to trigger animations on the card from external buttons
  const cardRef = useRef<ExamCardHandle>(null);
  
  const [accusedSins, setAccusedSins] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('soul_mirror_temp_sins');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('soul_mirror_temp_sins', JSON.stringify(accusedSins));
  }, [accusedSins]);

  const handleUserSelect = (type: UserType) => {
    setUserType(type);
    let q: Question[] = ADULT_QUESTIONS;
    if (type === 'youth') q = YOUTH_QUESTIONS;
    else if (type === 'priest') q = PRIEST_QUESTIONS;
    else if (type === 'child') q = CHILD_QUESTIONS;
    else if (type === 'general') q = GENERAL_CONFESSION_QUESTIONS;

    setQuestions(q);
    setAccusedSins([]); 
    setCurrentQuestionIndex(0);
    setStage('preparation');
  };

  const handleShowInstructions = () => setStage('instructions');
  const handleShowConfessionGuide = () => setStage('confession-guide');
  const handleBackToIntro = () => setStage('intro');
  const handlePreparationComplete = () => setStage('exam');

  const handleCardResult = (result: 'accused' | 'dismissed') => {
    if (result === 'accused') {
      const currentQuestion = questions[currentQuestionIndex];
      setAccusedSins(prev => [...prev, currentQuestion.text]);
    }

    // Delay to allow animation to complete before unmounting/switching
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStage('results');
      }
    }, 500);
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevIndex];
      setAccusedSins(prev => {
        const newSins = [...prev];
        const sinIndex = newSins.lastIndexOf(prevQuestion.text);
        if (sinIndex !== -1) {
          newSins.splice(sinIndex, 1);
        }
        return newSins;
      });
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem('soul_mirror_temp_sins');
    setAccusedSins([]);
    setUserType(null);
    setCurrentQuestionIndex(0);
    setStage('intro');
    setShowExitModal(false);
  };

  const getSourceText = () => {
    switch (userType) {
        case 'priest':
            return 'presbiteros.org.br';
        case 'general':
            return 'padrepauloricardo.org';
        case 'child':
        case 'youth':
        case 'adult':
        default:
            return 'opusdei.org';
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-background-dark text-parchment overflow-hidden font-sans selection:bg-primary selection:text-obsidian">

      {/* Background Texture */}
      <div className="absolute inset-0 z-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full max-w-lg mx-auto flex flex-col">
        
        {stage === 'intro' && (
          <IntroSelection 
            onSelect={handleUserSelect} 
            onInstructions={handleShowInstructions}
            onConfessionGuide={handleShowConfessionGuide}
          />
        )}

        {stage === 'instructions' && (
          <InstructionsScreen 
            onBack={handleBackToIntro} 
          />
        )}

        {stage === 'confession-guide' && (
          <ConfessionGuideScreen 
            onBack={handleBackToIntro} 
          />
        )}

        {stage === 'preparation' && (
          <PreparationScreen 
            onComplete={handlePreparationComplete}
            onBack={handleBackToIntro}
          />
        )}

        {stage === 'exam' && questions.length > 0 && (
          <div className="flex flex-col h-full w-full">
             
            {/* Header (Stitch Design) */}
            <header className="relative z-10 w-full px-4 pt-4 pb-2 flex items-center justify-between shrink-0">
                <button 
                    onClick={handleGoBack}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center justify-center w-12 h-12 text-accent-light hover:text-white transition-colors rounded-full active:bg-white/5 ${currentQuestionIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    <Undo2 size={28} strokeWidth={1.5} />
                </button>
                
                <div className="flex flex-col items-center">
                    {/* Dynamic Icon based on UserType */}
                    {userType === 'child' && <Baby size={28} className="text-primary/40 mb-1" strokeWidth={1.5} />}
                    {userType === 'youth' && <Leaf size={28} className="text-primary/40 mb-1" strokeWidth={1.5} />}
                    {userType === 'adult' && <Shield size={28} className="text-primary/40 mb-1" strokeWidth={1.5} />}
                    {userType === 'priest' && <Church size={28} className="text-primary/40 mb-1" strokeWidth={1.5} />}
                    {userType === 'general' && <Scroll size={28} className="text-parchment/60 mb-1" strokeWidth={1.5} />}
                    {/* Fallback */}
                    {!userType && <Church size={28} className="text-primary/40 mb-1" strokeWidth={1.5} />}
                </div>

                <button 
                    onClick={() => setShowExitModal(true)}
                    className="flex items-center justify-center w-12 h-12 text-parchment/60 hover:text-parchment transition-colors rounded-full active:bg-white/5"
                >
                    <X size={28} strokeWidth={1.5} />
                </button>
            </header>

            {/* Counter (Stitch Design) */}
            <div className="relative z-10 w-full text-center pb-2 shrink-0">
                <p className="font-sans text-accent-light text-sm font-bold tracking-[0.2em] opacity-80 uppercase">
                    Questão {currentQuestionIndex + 1} de {questions.length}
                </p>
            </div>

            {/* Main Card Area */}
            <main className="relative z-10 flex-1 w-full flex items-center justify-center px-6 py-2 overflow-visible min-h-0">
                <ExamCard 
                    ref={cardRef}
                    key={questions[currentQuestionIndex].id}
                    question={questions[currentQuestionIndex]}
                    onResult={handleCardResult}
                    currentIndex={currentQuestionIndex}
                    totalCount={questions.length}
                />
            </main>

            {/* Footer Actions (Stitch Design) */}
            <footer className="relative z-10 w-full px-8 pb-4 pt-2 shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-3">
                    {/* Nego Button - Triggers Left Swipe */}
                    <div 
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        onClick={() => cardRef.current?.swipe('left')}
                    >
                        <button className="flex items-center justify-center w-16 h-16 rounded-full glass-panel border-parchment/10 text-parchment/40 group-hover:text-parchment group-hover:border-deny/50 group-hover:bg-deny/20 transition-all duration-300 shadow-lg active:scale-95">
                            <XIcon size={32} strokeWidth={1.5} />
                        </button>
                        <span className="text-xs font-sans tracking-[0.15em] text-parchment/40 font-bold group-hover:text-parchment/70 transition-colors">NEGO</span>
                    </div>

                    {/* Confesso Button - Triggers Right Swipe */}
                    <div 
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        onClick={() => cardRef.current?.swipe('right')}
                    >
                        <button className="flex items-center justify-center w-16 h-16 rounded-full glass-panel border-parchment/10 text-parchment/40 group-hover:text-confess group-hover:border-confess/50 group-hover:bg-confess/20 transition-all duration-300 shadow-lg active:scale-95">
                            <Check size={32} strokeWidth={1.5} />
                        </button>
                        <span className="text-xs font-sans tracking-[0.15em] text-parchment/40 font-bold group-hover:text-primary transition-colors">CONFESSO</span>
                    </div>
                </div>

                {/* Exam Footer Info */}
                <div className="text-center space-y-1">
                    <p className="text-[10px] text-parchment/20 uppercase tracking-widest font-sans">
                        Fonte: {getSourceText()}
                    </p>
                    <p className="text-[10px] text-parchment/20 uppercase tracking-widest font-sans">
                        Uma iniciativa Santa Carona
                    </p>
                </div>
            </footer>
          </div>
        )}

        {stage === 'results' && (
          <ResultsScreen 
            accusedSins={accusedSins}
            onReset={handleReset}
          />
        )}
      </div>

      <ConfirmationModal 
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleReset}
        title="Interromper Exame?"
        description="O progresso atual será perdido. Deseja retornar ao início?"
      />
    </div>
  );
}