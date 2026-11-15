import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, XCircle, ArrowRight, Zap, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mascot } from './Mascot';
import { sounds } from '../utils/soundEffects';
import { speakText } from '../utils/speech';

export const QuizModal = ({
  lesson,
  targetLang,
  isBlitz = false,
  onClose,
  onCompleteLesson,
  hearts,
  setHearts
}) => {
  const questions = lesson.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Word Bank State
  const [selectedWordBank, setSelectedWordBank] = useState([]);
  const [remainingPool, setRemainingPool] = useState([]);

  // Match Pairs State
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Feedback State: null | 'correct' | 'incorrect'
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Blitz Timer (120 seconds countdown)
  const [timeLeft, setTimeLeft] = useState(isBlitz ? 120 : 0);

  const currentQ = questions[currentIdx];

  // Initialize question state whenever currentIdx changes
  useEffect(() => {
    if (!currentQ) return;
    setSelectedOption(null);
    setFeedback(null);
    setLeftSelected(null);
    setRightSelected(null);
    setMatchedPairs([]);

    if (currentQ.type === 'word-bank') {
      setSelectedWordBank([]);
      setRemainingPool([...currentQ.pool]);
    }

    // Auto-speak phrase for listening immersion
    if (currentQ.audioText) {
      speakText(currentQ.audioText, targetLang);
    }
  }, [currentIdx, currentQ]);

  // Blitz mode countdown timer
  useEffect(() => {
    if (!isBlitz || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishLesson();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isBlitz, isCompleted]);

  // Handle Match Pair Selection
  const handleSelectPair = (side, item) => {
    sounds.playPop();
    if (side === 'left') {
      setLeftSelected(item);
      if (rightSelected) {
        checkPairMatch(item, rightSelected);
      }
    } else {
      setRightSelected(item);
      if (leftSelected) {
        checkPairMatch(leftSelected, item);
      }
    }
  };

  const checkPairMatch = (left, right) => {
    const pair = currentQ.pairs.find(p => p.left === left && p.right === right);
    if (pair) {
      sounds.playMatch();
      const newMatched = [...matchedPairs, left];
      setMatchedPairs(newMatched);
      setLeftSelected(null);
      setRightSelected(null);

      if (newMatched.length === currentQ.pairs.length) {
        setFeedback('correct');
        sounds.playCorrect();
        setScore(prev => prev + 1);
      }
    } else {
      sounds.playIncorrect();
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  // Word Bank click helpers
  const handleWordBankSelect = (word, index) => {
    sounds.playPop();
    setSelectedWordBank(prev => [...prev, word]);
    setRemainingPool(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleWordBankRemove = (word, index) => {
    sounds.playPop();
    setRemainingPool(prev => [...prev, word]);
    setSelectedWordBank(prev => prev.filter((_, idx) => idx !== index));
  };

  // Check Answer Button Logic
  const handleCheck = () => {
    if (!currentQ) return;
    let isCorrect = false;

    if (currentQ.type === 'multiple-choice') {
      isCorrect = selectedOption === currentQ.correctIndex;
    } else if (currentQ.type === 'word-bank') {
      const userSentence = selectedWordBank.join(' ');
      const targetSentence = currentQ.correctWords.join(' ');
      isCorrect = userSentence.trim() === targetSentence.trim();
    } else if (currentQ.type === 'fill-blank') {
      isCorrect = selectedOption === currentQ.correctAnswer;
    } else if (currentQ.type === 'match-pairs') {
      isCorrect = matchedPairs.length === currentQ.pairs.length;
    }

    if (isCorrect) {
      sounds.playCorrect();
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      sounds.playIncorrect();
      setFeedback('incorrect');
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  // Proceed to next question or complete
  const handleContinue = () => {
    sounds.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setFeedback(null);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    setIsCompleted(true);
    sounds.playFanfare();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCompleteLesson(lesson, score, questions.length);
  };

  const progressPercent = Math.round(((currentIdx + (feedback === 'correct' ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between overflow-y-auto animate-in fade-in">
      {/* Top Header Bar */}
      <div className="max-w-3xl w-full mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => {
            sounds.playPop();
            if (confirm("Are you sure you want to quit? Your progress for this session will be lost.")) {
              onClose();
            }
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Smooth Duolingo Progress Bar */}
        <div className="flex-1 bg-gray-200 h-3.5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-duo-green h-full rounded-full transition-all duration-300 relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute top-0.5 right-1.5 w-4 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Timed Blitz or Hearts */}
        {isBlitz ? (
          <div className="flex items-center gap-1 font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            <Zap className="w-4 h-4 fill-amber-500" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 font-black text-rose-500">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="text-lg">{hearts}</span>
          </div>
        )}
      </div>

      {/* Main Interactive Quiz Card */}
      {!isCompleted ? (
        <div className="max-w-2xl w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center">
          {/* Question Title & Prompt */}
          <h2 className="text-xl sm:text-2xl font-black text-gray-800 text-left mb-6">
            {currentQ.prompt}
          </h2>

          {/* Interactive Mascot Hint / Speech Bubble */}
          <div className="flex items-start gap-4 mb-8">
            <Mascot emotion={feedback === 'incorrect' ? 'sad' : 'happy'} size="sm" />
            
            <div className="flex-1 bg-white border-2 border-duo-gray rounded-3xl p-4 shadow-duo relative">
              <div className="flex items-center justify-between">
                <div>
                  {currentQ.phrase && (
                    <div className="text-2xl sm:text-3xl font-black text-gray-800 tracking-wide">
                      {currentQ.phrase}
                    </div>
                  )}
                  {currentQ.phonetic && (
                    <div className="text-sm font-extrabold text-duo-blue mt-0.5">
                      Pronunciation: "{currentQ.phonetic}"
                    </div>
                  )}
                  {currentQ.englishSentence && (
                    <div className="text-base font-bold text-gray-700">
                      "{currentQ.englishSentence}"
                    </div>
                  )}
                </div>

                {/* Speaker Button for Native Audio Pronunciation */}
                {currentQ.audioText && (
                  <button
                    onClick={() => {
                      sounds.playPop();
                      speakText(currentQ.audioText, targetLang);
                    }}
                    className="p-3 rounded-2xl bg-duo-blue/10 hover:bg-duo-blue/20 text-duo-blue active:scale-90 transition-transform shadow-duo-sm"
                    title="Listen to native Indian pronunciation"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* QUESTION TYPE 1: MULTIPLE CHOICE */}
          {currentQ.type === 'multiple-choice' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={feedback !== null}
                    onClick={() => {
                      sounds.playPop();
                      setSelectedOption(idx);
                    }}
                    className={`p-4 rounded-2xl text-left font-black text-base transition-all ${
                      isSelected
                        ? 'border-2 border-duo-blue bg-blue-50 text-duo-blue shadow-duo-sm translate-y-0.5'
                        : 'border-2 border-duo-gray bg-white text-gray-700 hover:bg-gray-50 shadow-duo'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl border border-gray-300 text-xs flex items-center justify-center font-bold text-gray-500">
                        {idx + 1}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* QUESTION TYPE 2: WORD BANK (Tap words to assemble sentence) */}
          {currentQ.type === 'word-bank' && (
            <div className="space-y-6">
              {/* Target Assembly Line */}
              <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-wrap gap-2 items-center">
                {selectedWordBank.length === 0 ? (
                  <span className="text-gray-400 text-sm font-bold italic ml-2">
                    Tap the Indian words below to assemble your answer...
                  </span>
                ) : (
                  selectedWordBank.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleWordBankRemove(word, idx)}
                      className="px-3.5 py-2 rounded-xl bg-white border-2 border-duo-gray text-gray-800 font-extrabold text-sm shadow-duo-sm hover:bg-red-50 active:scale-95 transition-all"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Word Pool / Jumbled Chips */}
              <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                {remainingPool.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordBankSelect(word, idx)}
                    className="px-4 py-2.5 rounded-2xl bg-white border-2 border-duo-gray text-gray-800 font-black text-base shadow-duo hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION TYPE 3: MATCH THE PAIRS */}
          {currentQ.type === 'match-pairs' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Left Column (Indian Phrases) */}
              <div className="space-y-2.5">
                {currentQ.pairs.map((p, idx) => {
                  const isMatched = matchedPairs.includes(p.left);
                  const isSelected = leftSelected === p.left;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleSelectPair('left', p.left)}
                      className={`w-full p-3.5 rounded-2xl text-left font-black text-xs sm:text-sm transition-all ${
                        isMatched
                          ? 'border-2 border-green-200 bg-green-50 text-green-700 opacity-60'
                          : isSelected
                          ? 'border-2 border-duo-blue bg-blue-50 text-duo-blue shadow-duo-sm translate-y-0.5'
                          : 'border-2 border-duo-gray bg-white text-gray-700 shadow-duo hover:bg-gray-50'
                      }`}
                    >
                      {p.left}
                    </button>
                  );
                })}
              </div>

              {/* Right Column (Meanings) */}
              <div className="space-y-2.5">
                {/* Shuffle right sides for challenge */}
                {currentQ.pairs.map((p, idx) => {
                  const matchedLeft = currentQ.pairs.find(pair => pair.right === p.right)?.left;
                  const isMatched = matchedPairs.includes(matchedLeft);
                  const isSelected = rightSelected === p.right;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleSelectPair('right', p.right)}
                      className={`w-full p-3.5 rounded-2xl text-left font-black text-xs sm:text-sm transition-all ${
                        isMatched
                          ? 'border-2 border-green-200 bg-green-50 text-green-700 opacity-60'
                          : isSelected
                          ? 'border-2 border-duo-blue bg-blue-50 text-duo-blue shadow-duo-sm translate-y-0.5'
                          : 'border-2 border-duo-gray bg-white text-gray-700 shadow-duo hover:bg-gray-50'
                      }`}
                    >
                      {p.right}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION TYPE 4: FILL IN THE BLANK */}
          {currentQ.type === 'fill-blank' && (
            <div className="space-y-6">
              <div className="text-xl sm:text-2xl font-black text-gray-800 text-center py-4 bg-gray-50 rounded-2xl border border-gray-200">
                {currentQ.sentenceParts[0]}{' '}
                <span className="inline-block px-4 py-1 border-b-4 border-duo-blue text-duo-blue font-black">
                  {selectedOption || '________'}
                </span>{' '}
                {currentQ.sentenceParts[1]}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={feedback !== null}
                    onClick={() => {
                      sounds.playPop();
                      setSelectedOption(option);
                    }}
                    className={`p-4 rounded-2xl font-black text-sm text-center transition-all ${
                      selectedOption === option
                        ? 'border-2 border-duo-blue bg-blue-50 text-duo-blue shadow-duo-sm translate-y-0.5'
                        : 'border-2 border-duo-gray bg-white text-gray-700 shadow-duo hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* LESSON COMPLETE CELEBRATION SCREEN */
        <div className="max-w-md w-full mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
          <Mascot emotion="celebrate" size="lg" speech="Shabash! Excellent Job!" />
          
          <h2 className="text-3xl font-black text-amber-500 mt-4">Lesson Complete!</h2>
          <p className="text-sm font-bold text-gray-500 mt-1">
            You're mastering Indian languages one day at a time!
          </p>

          {/* Performance Badges */}
          <div className="grid grid-cols-3 gap-3 w-full mt-6">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 shadow-duo-sm">
              <div className="text-xs font-black uppercase text-amber-600">Total XP</div>
              <div className="text-xl font-black text-amber-700 mt-1 flex items-center justify-center gap-1">
                <Zap className="w-5 h-5 fill-current" />
                +{lesson.xp || 15}
              </div>
            </div>

            <div className="bg-cyan-50 border-2 border-cyan-300 rounded-2xl p-3 shadow-duo-sm">
              <div className="text-xs font-black uppercase text-cyan-600">Ratnas</div>
              <div className="text-xl font-black text-cyan-700 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 fill-current" />
                +10 💎
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 shadow-duo-sm">
              <div className="text-xs font-black uppercase text-emerald-600">Accuracy</div>
              <div className="text-xl font-black text-emerald-700 mt-1">
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="mt-8 w-full py-4 rounded-2xl duo-btn-green text-white font-black text-base uppercase tracking-wider shadow-duo"
          >
            CONTINUE TO LEARNING PATH
          </button>
        </div>
      )}

      {/* BOTTOM ACTION & FEEDBACK DRAWER */}
      {!isCompleted && (
        <div
          className={`border-t-2 transition-colors p-4 sm:p-6 ${
            feedback === 'correct'
              ? 'bg-[#d7ffb8] border-[#a5ed6e]'
              : feedback === 'incorrect'
              ? 'bg-[#ffdfe0] border-[#ff9398]'
              : 'bg-white border-duo-gray'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {feedback === 'correct' ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-duo-green flex items-center justify-center text-white">
                  <CheckCircle2 className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-duo-greenDark">Nicely done! 🎉</h4>
                  <p className="text-xs font-bold text-emerald-800">
                    {currentQ.tip || 'Correct answer! Keep up the momentum!'}
                  </p>
                </div>
              </div>
            ) : feedback === 'incorrect' ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-duo-red flex items-center justify-center text-white">
                  <XCircle className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-duo-redDark">Correct solution:</h4>
                  <p className="text-xs font-bold text-rose-900">
                    {currentQ.type === 'multiple-choice'
                      ? currentQ.options[currentQ.correctIndex]
                      : currentQ.type === 'word-bank'
                      ? currentQ.targetSentence
                      : currentQ.correctAnswer || 'See highlighted answer above'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs font-bold text-gray-400">
                Take your time to learn each word!
              </div>
            )}

            {/* Check / Continue Button */}
            {feedback === null ? (
              <button
                disabled={
                  (currentQ.type === 'multiple-choice' && selectedOption === null) ||
                  (currentQ.type === 'word-bank' && selectedWordBank.length === 0) ||
                  (currentQ.type === 'fill-blank' && selectedOption === null) ||
                  (currentQ.type === 'match-pairs' && matchedPairs.length < currentQ.pairs.length)
                }
                onClick={handleCheck}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-duo transition-all ${
                  (currentQ.type === 'multiple-choice' && selectedOption !== null) ||
                  (currentQ.type === 'word-bank' && selectedWordBank.length > 0) ||
                  (currentQ.type === 'fill-blank' && selectedOption !== null) ||
                  (currentQ.type === 'match-pairs' && matchedPairs.length === currentQ.pairs.length)
                    ? 'duo-btn-green text-white active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                CHECK
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider text-white shadow-duo transition-all active:scale-95 ${
                  feedback === 'correct' ? 'duo-btn-green' : 'duo-btn-orange'
                }`}
              >
                CONTINUE
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
