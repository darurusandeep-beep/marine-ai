import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PathView } from './components/PathView';
import { QuizModal } from './components/QuizModal';
import { TimeGoalModal } from './components/TimeGoalModal';
import { ShopModal } from './components/ShopModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ProfileModal } from './components/ProfileModal';
import { CURRICULUM, SUPPORTED_LANGUAGES } from './data/languages';
import { sounds } from './utils/soundEffects';

export function App() {
  // Load saved state or default
  const [targetLang, setTargetLang] = useState(() => localStorage.getItem('indrat_targetLang') || 'ta');
  const [sourceLang, setSourceLang] = useState(() => localStorage.getItem('indrat_sourceLang') || 'en');
  
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(() => {
    return parseInt(localStorage.getItem('indrat_goalMinutes') || '5', 10);
  });
  
  const [timeSpentMinutes, setTimeSpentMinutes] = useState(() => {
    return parseInt(localStorage.getItem('indrat_timeSpent') || '2', 10);
  });

  const [hearts, setHearts] = useState(() => {
    return parseInt(localStorage.getItem('indrat_hearts') || '5', 10);
  });

  const [gems, setGems] = useState(() => {
    return parseInt(localStorage.getItem('indrat_gems') || '120', 10);
  });

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('indrat_streak') || '3', 10);
  });

  const [userXp, setUserXp] = useState(() => {
    return parseInt(localStorage.getItem('indrat_xp') || '145', 10);
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('indrat_completedLessons') || '[]');
    } catch {
      return [];
    }
  });

  // Modals state
  const [activeLesson, setActiveLesson] = useState(null);
  const [isBlitz, setIsBlitz] = useState(false);
  const [isTimeGoalOpen, setIsTimeGoalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('indrat_targetLang', targetLang);
    localStorage.setItem('indrat_sourceLang', sourceLang);
    localStorage.setItem('indrat_goalMinutes', dailyGoalMinutes.toString());
    localStorage.setItem('indrat_timeSpent', timeSpentMinutes.toString());
    localStorage.setItem('indrat_hearts', hearts.toString());
    localStorage.setItem('indrat_gems', gems.toString());
    localStorage.setItem('indrat_streak', streak.toString());
    localStorage.setItem('indrat_xp', userXp.toString());
    localStorage.setItem('indrat_completedLessons', JSON.stringify(completedLessons));
  }, [targetLang, sourceLang, dailyGoalMinutes, timeSpentMinutes, hearts, gems, streak, userXp, completedLessons]);

  // Handle lesson start
  const handleStartLesson = (lesson) => {
    if (hearts <= 0) {
      alert("❤️ You are out of hearts! Refill in the Bazaar (Shop) to continue practicing.");
      setIsShopOpen(true);
      return;
    }
    setIsBlitz(false);
    setActiveLesson(lesson);
  };

  // Handle 2-minute blitz challenge
  const handleStartBlitz = () => {
    if (hearts <= 0) {
      alert("❤️ You are out of hearts! Refill in the Bazaar (Shop) to continue.");
      setIsShopOpen(true);
      return;
    }
    // Pick first available lesson or fallback
    const currentCurriculum = CURRICULUM[targetLang] || CURRICULUM['ta'];
    const lesson = currentCurriculum.units[0]?.lessons[0];
    if (lesson) {
      setIsBlitz(true);
      setActiveLesson(lesson);
    }
  };

  // Handle lesson completion
  const handleCompleteLesson = (lesson, score, totalQuestions) => {
    // Award XP
    const earnedXp = lesson.xp || 15;
    setUserXp(prev => prev + earnedXp);
    setGems(prev => prev + 10);

    // Track study time (e.g. +2 mins per lesson)
    setTimeSpentMinutes(prev => prev + 2);

    // Add to completed lessons
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
  };

  const currentCurriculum = CURRICULUM[targetLang] || CURRICULUM['ta'];

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#4b4b4b] flex flex-col justify-between">
      {/* Top Interactive Duolingo Header */}
      <Header
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        sourceLang={sourceLang}
        setSourceLang={setSourceLang}
        hearts={hearts}
        gems={gems}
        streak={streak}
        dailyGoalMinutes={dailyGoalMinutes}
        timeSpentMinutes={timeSpentMinutes}
        openTimeGoalModal={() => setIsTimeGoalOpen(true)}
        openShopModal={() => setIsShopOpen(true)}
        openLeaderboardModal={() => setIsLeaderboardOpen(true)}
        openProfileModal={() => setIsProfileOpen(true)}
      />

      {/* Main Path View with Units & Lessons */}
      <main className="flex-1">
        <PathView
          curriculumData={currentCurriculum}
          completedLessons={completedLessons}
          onStartLesson={handleStartLesson}
          onStartBlitz={handleStartBlitz}
          dailyGoalMinutes={dailyGoalMinutes}
          timeSpentMinutes={timeSpentMinutes}
          openTimeGoalModal={() => setIsTimeGoalOpen(true)}
        />
      </main>

      {/* Active Quiz Overlay */}
      {activeLesson && (
        <QuizModal
          lesson={activeLesson}
          targetLang={targetLang}
          isBlitz={isBlitz}
          hearts={hearts}
          setHearts={setHearts}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={handleCompleteLesson}
        />
      )}

      {/* Time Goal Customization Modal */}
      {isTimeGoalOpen && (
        <TimeGoalModal
          currentMinutes={dailyGoalMinutes}
          onSelectGoal={(mins) => {
            setDailyGoalMinutes(mins);
            setIsTimeGoalOpen(false);
          }}
          onClose={() => setIsTimeGoalOpen(false)}
        />
      )}

      {/* Bazaar / Shop Modal */}
      {isShopOpen && (
        <ShopModal
          gems={gems}
          setGems={setGems}
          hearts={hearts}
          setHearts={setHearts}
          onClose={() => setIsShopOpen(false)}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          userXp={userXp}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          userXp={userXp}
          streak={streak}
          timeSpentMinutes={timeSpentMinutes}
          completedLessonsCount={completedLessons.length}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t-2 border-duo-gray bg-white py-4 px-4 text-center text-xs font-bold text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>🦚</span>
            <span className="font-extrabold text-gray-700">INDRAT</span>
            <span>— The Duolingo of Indian Languages</span>
          </div>
          <div>
            Learning: <span className="font-extrabold text-duo-blue">{currentCurriculum.title}</span> • Made with ❤️ in Bharat
          </div>
        </div>
      </footer>
    </div>
  );
}
