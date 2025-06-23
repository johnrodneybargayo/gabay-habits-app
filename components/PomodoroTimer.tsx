import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import PomodoroTipsSlider from './PomodoroTipsSlider';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState('0');
  const [focusSeconds, setFocusSeconds] = useState('0');
  const [breakMinutes, setBreakMinutes] = useState('0');
  const [breakSeconds, setBreakSeconds] = useState('0');
  const [breakInterval, setBreakInterval] = useState('4');
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTime = (min: string, sec: string) => {
    const minutes = parseInt(min.replace(/[^0-9]/g, '')) || 0;
    const seconds = parseInt(sec.replace(/[^0-9]/g, '')) || 0;
    return minutes * 60 + seconds;
  };

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
                setTimeLeft(calculateTime(breakMinutes, breakSeconds));
              } else {
                setTimeLeft(calculateTime(focusMinutes, focusSeconds));
              }

              setCompletedSessions(sessions);
            } else {
              setIsBreak(false);
              setTimeLeft(calculateTime(focusMinutes, focusSeconds));
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

  useEffect(() => {
    if (!isBreak && !isRunning) {
      setTimeLeft(calculateTime(focusMinutes, focusSeconds));
    }
  }, [focusMinutes, focusSeconds]);

  useEffect(() => {
    if (isBreak && !isRunning) {
      setTimeLeft(calculateTime(breakMinutes, breakSeconds));
    }
  }, [breakMinutes, breakSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View className={`rounded-xl p-6 mb-6 ${isBreak ? 'bg-green-100' : 'bg-white'}`}>
      <Text className={`text-xl font-bold mb-1 ${isBreak ? 'text-green-700' : 'text-accent'}`}>
        Pomodoro Timer
      </Text>
      <Text className={`text-center text-lg font-bold mb-2 ${isBreak ? 'text-green-700' : 'text-primary'}`}>
        {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
      </Text>

      <Text className="text-sm text-center text-secondary mb-4">
        Sessions until break: {(parseInt(breakInterval) || 1) - (completedSessions % (parseInt(breakInterval) || 1))}
      </Text>

      <View className="mb-6">
        <Text className="text-primary font-semibold mb-2">Focus Duration</Text>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="text-sm text-secondary mb-1">Minutes</Text>
            <TextInput
              className="bg-gray-100 rounded-md px-4 py-3 text-primary"
              keyboardType="numeric"
              value={focusMinutes}
              onChangeText={(text) => setFocusMinutes(text.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor="#666"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm text-secondary mb-1">Seconds</Text>
            <TextInput
              className="bg-gray-100 rounded-md px-4 py-3 text-primary"
              keyboardType="numeric"
              value={focusSeconds}
              onChangeText={(text) => setFocusSeconds(text.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-primary font-semibold mb-2">Break Duration</Text>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="text-sm text-secondary mb-1">Minutes</Text>
            <TextInput
              className="bg-gray-100 rounded-md px-4 py-3 text-primary"
              keyboardType="numeric"
              value={breakMinutes}
              onChangeText={(text) => setBreakMinutes(text.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor="#666"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm text-secondary mb-1">Seconds</Text>
            <TextInput
              className="bg-gray-100 rounded-md px-4 py-3 text-primary"
              keyboardType="numeric"
              value={breakSeconds}
              onChangeText={(text) => setBreakSeconds(text.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-primary font-semibold mb-2">Break Interval (sessions)</Text>
        <TextInput
          className="bg-gray-100 rounded-md px-4 py-3 text-primary"
          keyboardType="numeric"
          value={breakInterval}
          onChangeText={(text) => setBreakInterval(text.replace(/[^0-9]/g, ''))}
          placeholder="Every how many sessions?"
          placeholderTextColor="#666"
        />
      </View>

      <Text className="text-5xl text-primary text-center mb-6">{formatTime(timeLeft)}</Text>

      <View className="flex-row space-x-4 mb-6">
        <TouchableOpacity
          className={`flex-1 ${isBreak ? 'bg-green-700' : 'bg-black'} rounded-md py-3`}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Text className="text-white text-center font-bold">
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-gray-200 rounded-md py-3"
          onPress={() => {
            setIsRunning(false);
            setIsBreak(false);
            setCompletedSessions(0);
            setTimeLeft(calculateTime(focusMinutes, focusSeconds));
          }}
        >
          <Text className="text-center font-bold text-primary">Reset</Text>
        </TouchableOpacity>
      </View>

      <PomodoroTipsSlider isBreak={isBreak} />
    </View>
  );
};

export default PomodoroTimer;
