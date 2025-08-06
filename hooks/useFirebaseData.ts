import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { getFirebaseAuth, getFirebaseDatabase } from '../firebase/firebase';

const useFirebaseData = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getFirebaseAuth();
      const database = getFirebaseDatabase();
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        try {
          const userRef = ref(database, `users/${userId}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
            setError('No user data available');
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(`Error fetching user data: ${error.message}`);
          } else {
            setError('An unknown error occurred while fetching user data.');
          }
        }
      } else {
        setError('No authenticated user');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useFirebaseData;
