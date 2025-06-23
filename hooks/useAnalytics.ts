import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { auth, database } from '../services/firebase';

const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        try {
          const analyticsRef = ref(database, `users/${userId}/analytics`);
          const snapshot = await get(analyticsRef);
          if (snapshot.exists()) {
            setAnalyticsData(snapshot.val());
          } else {
            setAnalyticsData(null);
            setError('No analytics data available');
          }
        } catch (error) {
          // Type narrowing for the error object
          if (error instanceof Error) {
            setError(`Error fetching analytics data: ${error.message}`);
          } else {
            setError('An unknown error occurred while fetching analytics data.');
          }
        }
      } else {
        setError('No authenticated user');
      }
      setLoading(false);
    };

    fetchAnalyticsData();
  }, []);

  return { analyticsData, loading, error };
};

export default useAnalytics;
