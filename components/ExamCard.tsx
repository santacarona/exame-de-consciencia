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

  const rotate = useTransform(x, [-250, 250], [-6, 6]);
  const rightStampOpacity = useTransform(x, [20, 80], [0, 1]);
  const leftStampOpacity = useTransform(x, [-20, -80], [0, 1]);

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
            <h2 className="font-sans text-[22px] md:text-[26px] font-semibold tracking-[-0.3px] leading-[1.3] text-center text-ink mb-5">
                {mainText}
            </h2>
            {subText && (
                <p className="font-sans text-[15px] md:text-[16px] text-center text-ink-muted-80 max-w-[90%] leading-[1.47] border-t border-hairline pt-4 font-normal">
                    {subText}
                </p>
            )}
        </div>
    );
  };

  return (
    <div className="absolute inset-x-6 inset-y-2 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ x, rotate }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ opacity: { duration: 0.25 } }}
        drag={isExiting ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
        onDragEnd={handleDragEnd}
        className="pointer-events-auto relative w-full max-w-sm h-full max-h-[400px] rounded-lg bg-surface-pearl border border-hairline p-8 flex flex-col items-center justify-between cursor-grab active:cursor-grabbing"
      >
        {/* Content */}
        <div className="flex-1 flex items-center justify-center w-full">
            {renderQuestionText(question.text)}
        </div>

        {/* STAMPS */}
        <motion.div
            style={{ opacity: rightStampOpacity }}
            className="absolute top-8 left-1/2 -translate-x-1/2 rotate-6 bg-primary text-white px-5 py-2 rounded-pill pointer-events-none font-sans font-semibold text-sm tracking-[0.15em] uppercase z-50"
        >
            Confesso
        </motion.div>

        <motion.div
            style={{ opacity: leftStampOpacity }}
            className="absolute top-8 left-1/2 -translate-x-1/2 -rotate-6 bg-surface-tile-1 border border-hairline text-ink-muted-80 px-5 py-2 rounded-pill pointer-events-none font-sans font-semibold text-sm tracking-[0.15em] uppercase z-50"
        >
            Nego
        </motion.div>

      </motion.div>
    </div>
  );
});

ExamCard.displayName = "ExamCard";
