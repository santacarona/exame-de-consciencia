import React, { useState, useEffect, useRef } from 'react';
import { IntroSelection } from './components/IntroSelection';
import { InstructionsScreen } from './components/InstructionsScreen';
import { PreparationScreen } from './components/PreparationScreen';
import { ExamCard, ExamCardHandle } from './components/ExamCard';
import { ResultsScreen } from './components/ResultsScreen';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ConfessionGuideScreen } from './components/ConfessionGuideScreen';
import { UserType, AppStage, Question } from './types';
import { YOUTH_QUESTIONS, ADULT_QUESTIONS, PRIEST_QUESTIONS, CHILD_QUESTIONS, SEMINARIAN_QUESTIONS, GENERAL_CONFESSION_QUESTIONS } from './constants';
import { Undo2, X, Church, Check, X as XIcon, Briefcase, Leaf, Baby, Scroll, GraduationCap } from 'lucide-react';
import { SantaCaronaSignature } from './components/SantaCaronaSignature';

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
    else if (type === 'seminarian') q = SEMINARIAN_QUESTIONS;
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
        case 'seminarian':
            return 'Pe. Dylan James';
        case 'child':
        case 'youth':
        case 'adult':
        default:
            return 'opusdei.org';
    }
  };

  // Keyboard shortcuts for desktop: ← NEGO, → CONFESSO, Backspace goes back, Escape exits
  useEffect(() => {
    if (stage !== 'exam' || showExitModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft') cardRef.current?.swipe('left');
      else if (e.key === 'ArrowRight') cardRef.current?.swipe('right');
      else if (e.key === 'Backspace') handleGoBack();
      else if (e.key === 'Escape') setShowExitModal(true);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stage, showExitModal, currentQuestionIndex, questions]);

  const renderActionButton = (direction: 'left' | 'right', className = 'flex') => {
    const isConfess = direction === 'right';
    return (
        <div
            className={`${className} flex-col items-center gap-2 group cursor-pointer shrink-0`}
            onClick={() => cardRef.current?.swipe(direction)}
        >
            <button aria-label={isConfess ? 'Confesso' : 'Nego'} className={`flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-pill transition-transform active:scale-95 ${isConfess ? 'bg-primary text-white' : 'bg-surface-pearl border border-hairline text-ink-muted-80'}`}>
                {isConfess ? <Check size={28} strokeWidth={1.5} /> : <XIcon size={28} strokeWidth={1.5} />}
            </button>
            <span className={`text-[11px] font-sans tracking-[0.15em] font-semibold ${isConfess ? 'text-primary' : 'text-ink-muted-48'}`}>
                {isConfess ? 'CONFESSO' : 'NEGO'}
            </span>
        </div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-canvas text-ink overflow-hidden font-sans selection:bg-primary selection:text-white">

      {/* Main Content Container */}
      <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col">
        
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
          <div className="flex flex-col flex-1 min-h-0 w-full">
             
            {/* Header */}
            <header className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between shrink-0">
                <button
                    onClick={handleGoBack}
                    aria-label="Voltar à pergunta anterior"
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center justify-center w-11 h-11 rounded-pill bg-chip-translucent text-ink transition-transform active:scale-95 ${currentQuestionIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    <Undo2 size={20} strokeWidth={1.5} />
                </button>

                <div className="flex flex-col items-center">
                    {/* Dynamic Icon based on UserType */}
                    {userType === 'child' && <Baby size={22} className="text-primary/50" strokeWidth={1.5} />}
                    {userType === 'youth' && <Leaf size={22} className="text-primary/50" strokeWidth={1.5} />}
                    {userType === 'adult' && <Briefcase size={22} className="text-primary/50" strokeWidth={1.5} />}
                    {userType === 'priest' && <Church size={22} className="text-primary/50" strokeWidth={1.5} />}
                    {userType === 'seminarian' && <GraduationCap size={22} className="text-primary/50" strokeWidth={1.5} />}
                    {userType === 'general' && <Scroll size={22} className="text-ink-muted-48" strokeWidth={1.5} />}
                    {/* Fallback */}
                    {!userType && <Church size={22} className="text-primary/50" strokeWidth={1.5} />}
                </div>

                <button
                    onClick={() => setShowExitModal(true)}
                    aria-label="Sair do exame"
                    className="flex items-center justify-center w-11 h-11 rounded-pill bg-chip-translucent text-ink transition-transform active:scale-95"
                >
                    <X size={20} strokeWidth={1.5} />
                </button>
            </header>

            {/* Counter */}
            <div className="relative z-10 w-full text-center pb-2 shrink-0">
                <p className="font-sans text-ink-muted-48 text-[12px] font-normal tracking-[0.18em] uppercase">
                    Questão {currentQuestionIndex + 1} de {questions.length}
                </p>
            </div>

            {/* Main Card Area — on tablet/desktop the action buttons sit beside the card */}
            <main className="relative z-10 flex-1 w-full flex items-center justify-center gap-10 lg:gap-16 px-6 py-2 overflow-visible min-h-0">
                {renderActionButton('left', 'hidden md:flex')}

                <div className="relative h-full w-full max-w-sm md:max-w-md lg:max-w-lg">
                    <ExamCard
                        ref={cardRef}
                        key={questions[currentQuestionIndex].id}
                        question={questions[currentQuestionIndex]}
                        onResult={handleCardResult}
                        currentIndex={currentQuestionIndex}
                        totalCount={questions.length}
                    />
                </div>

                {renderActionButton('right', 'hidden md:flex')}
            </main>

            {/* Footer Actions */}
            <footer className="relative z-10 w-full px-8 pb-4 pt-2 shrink-0 flex flex-col items-center">
                <div className="flex md:hidden items-center justify-between w-full max-w-sm mx-auto mb-3">
                    {renderActionButton('left')}
                    {renderActionButton('right')}
                </div>

                <p className="hidden md:block text-[11px] text-ink-muted-48 tracking-[0.1em] font-sans mb-3">
                    ← Nego · → Confesso · Backspace volta · Esc sai
                </p>

                {/* Exam Footer Info */}
                <div className="text-center space-y-4">
                    <p className="text-[10px] text-ink-muted-48 opacity-70 uppercase tracking-widest font-sans">
                        Fonte: {getSourceText()}
                    </p>
                    <SantaCaronaSignature />
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