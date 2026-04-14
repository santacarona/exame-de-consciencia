import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { motion, animate, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Question } from '../types';

interface ExamCardProps {
  question: Question;
  onResult: (result: 'accused' | 'dismissed') => void;
  currentIndex: number;
  totalCount: number;
}

export interface ExamCardHandle {
  swipe: (direction: 'left' | 'right') => void;
}

export const ExamCard = forwardRef<ExamCardHandle, ExamCardProps>(({ question, onResult }, ref) => {
  const [isExiting, setIsExiting] = useState(false);
  const isDismissed = React.useRef(false);
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-250, 250], [-8, 8]);
  const rightStampOpacity = useTransform(x, [20, 80], [0, 1]);
  const leftStampOpacity = useTransform(x, [-20, -80], [0, 1]);
  const confessGlowOpacity = useTransform(x, [0, 120], [0, 0.12]);
  const denyGlowOpacity = useTransform(x, [0, -120], [0, 0.12]);

  const dismiss = (direction: 'right' | 'left', velocity = 0) => {
    if (isDismissed.current) return;
    isDismissed.current = true;
    setIsExiting(true);

    const target = direction === 'right'
      ? window.innerWidth + 100
      : -(window.innerWidth + 100);

    animate(x, target, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      velocity: velocity || (direction === 'right' ? 800 : -800),
    });

    onResult(direction === 'right' ? 'accused' : 'dismissed');
  };

  useImperativeHandle(ref, () => ({
    swipe: (direction: 'left' | 'right') => dismiss(direction),
  }));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80 || info.velocity.x > 400) {
      dismiss('right', info.velocity.x);
    } else if (info.offset.x < -80 || info.velocity.x < -400) {
      dismiss('left', info.velocity.x);
    }
  };

  const renderQuestionText = (text: string) => {
    let mainText = text;
    let subText = "";

    const firstSplit = text.indexOf("? ");
    if (firstSplit !== -1) {
        mainText = text.slice(0, firstSplit + 1);
        subText = text.slice(firstSplit + 2);
    }

    return (
        <div className="flex flex-col items-center justify-center my-4 relative w-full z-10">
            <h2 className="font-serif text-2xl md:text-3xl font-normal leading-snug text-center text-parchment mb-6">
                {mainText}
            </h2>
            {subText && (
                <p className="font-serif text-base md:text-lg text-center text-parchment-dim max-w-[90%] leading-relaxed border-t border-primary/20 pt-4 font-normal opacity-80">
                    {subText}
                </p>
            )}
        </div>
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none perspective-1000">
      <motion.div
        style={{ x, rotate }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ opacity: { duration: 0.25 } }}
        drag={isExiting ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
        onDragEnd={handleDragEnd}
        className="pointer-events-auto glass-panel relative w-full max-w-sm aspect-[4/5] max-h-[520px] rounded-2xl p-8 flex flex-col items-center justify-between group border border-white/5 cursor-grab active:cursor-grabbing"
      >
        {/* Inner Border Decoration */}
        <div className="absolute inset-3 border border-primary/10 rounded-xl pointer-events-none"></div>

        {/* Dynamic Glow Backgrounds (Simulating the blobs in Stitch) */}
        <motion.div style={{ opacity: confessGlowOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-confess blur-[80px] rounded-full"></div>
        </motion.div>
        
        <motion.div style={{ opacity: denyGlowOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-deny blur-[80px] rounded-full"></div>
        </motion.div>

        {/* Top Spacer */}
        <div className="w-full h-4 shrink-0"></div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center w-full">
            {renderQuestionText(question.text)}
        </div>

        {/* STAMPS (Centered Horizontally only) */}
        <motion.div 
            style={{ opacity: rightStampOpacity }}
            className="absolute top-24 left-1/2 -translate-x-1/2 rotate-12 border-[6px] border-confess text-confess px-4 py-2 rounded-lg pointer-events-none font-serif font-bold text-4xl tracking-widest mix-blend-plus-lighter z-50 shadow-[0_0_30px_rgba(158,43,43,0.6)] backdrop-blur-[2px]"
        >
            CONFESSO
        </motion.div>

        <motion.div 
            style={{ opacity: leftStampOpacity }}
            className="absolute top-24 left-1/2 -translate-x-1/2 -rotate-12 border-[6px] border-deny text-deny px-4 py-2 rounded-lg pointer-events-none font-serif font-bold text-4xl tracking-widest mix-blend-plus-lighter z-50 shadow-[0_0_30px_rgba(255,255,255,0.25)] backdrop-blur-[2px]"
        >
            NEGO
        </motion.div>

      </motion.div>
    </div>
  );
});

ExamCard.displayName = "ExamCard";