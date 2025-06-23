import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type PomodoroContextType = {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  focusDuration: string;
  breakDuration: string;
  breakInterval: string;
  completedSessions: number;
  setIsRunning: (val: boolean) => void;
  setFocusDuration: (val: string) => void;
  setBreakDuration: (val: string) => void;
  setBreakInterval: (val: string) => void;
  resetTimer: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error('usePomodoro must be used within PomodoroProvider');
  return context;
};

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState('25');
  const [breakDuration, setBreakDuration] = useState('5');
  const [breakInterval, setBreakInterval] = useState('4');

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);

            if (!isBreak) {
              const interval = parseInt(breakInterval) || 1;
              const sessions = completedSessions + 1;

              if (sessions % interval === 0) {
                setIsBreak(true);
                setTimeLeft(parseInt(breakDuration) * 60);
              } else {
                setTimeLeft(parseInt(focusDuration) * 60);
              }

              setCompletedSessions(sessions);
            } else {
              setIsBreak(false);
              setTimeLeft(parseInt(focusDuration) * 60);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCompletedSessions(0);
    setTimeLeft(parseInt(focusDuration) * 60 || 25 * 60);
  };

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        isRunning,
        isBreak,
        focusDuration,
        breakDuration,
        breakInterval,
        completedSessions,
        setIsRunning,
        setFocusDuration,
        setBreakDuration,
        setBreakInterval,
        resetTimer,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
