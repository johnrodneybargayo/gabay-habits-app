import { useState } from 'react';
import { ref, push, update, remove } from 'firebase/database';
import { getFirebaseAuth, getFirebaseDatabase } from '../firebase/firebase';

const useHabitManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleErrors = (err: unknown, action: string) => {
    if (err instanceof Error) {
      setError(`Error ${action}: ${err.message}`);
    } else {
      setError(`Unknown error occurred while ${action}.`);
    }
    setLoading(false);
  };

  const addHabit = async (habit: any) => {
    const auth = getFirebaseAuth();
    const database = getFirebaseDatabase();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        setLoading(true);
        const habitsRef = ref(database, `users/${userId}/habits`);
        await push(habitsRef, habit);
        setLoading(false);
      } catch (err) {
        handleErrors(err, 'adding habit');
      }
    } else {
      setError('No authenticated user');
    }
  };

  const updateHabit = async (habitId: string, updatedHabit: any) => {
    const auth = getFirebaseAuth();
    const database = getFirebaseDatabase();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        setLoading(true);
        const habitRef = ref(database, `users/${userId}/habits/${habitId}`);
        await update(habitRef, updatedHabit);
        setLoading(false);
      } catch (err) {
        handleErrors(err, 'updating habit');
      }
    } else {
      setError('No authenticated user');
    }
  };

  const deleteHabit = async (habitId: string) => {
    const auth = getFirebaseAuth();
    const database = getFirebaseDatabase();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        setLoading(true);
        const habitRef = ref(database, `users/${userId}/habits/${habitId}`);
        await remove(habitRef);
        setLoading(false);
      } catch (err) {
        handleErrors(err, 'deleting habit');
      }
    } else {
      setError('No authenticated user');
    }
  };

  return { addHabit, updateHabit, deleteHabit, loading, error };
};

export default useHabitManagement;
