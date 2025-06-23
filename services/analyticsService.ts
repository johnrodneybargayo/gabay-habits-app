import { ref, get } from 'firebase/database';
import { getFirebaseAuth, getFirebaseDatabase } from '../firebase/firebase';


export interface AnalyticsData {
  habitStats: number[];
  streaks: number[];
  completionRates: number[];
}

export const fetchAnalyticsData = async (): Promise<AnalyticsData | null> => {
  try {
    const auth = getFirebaseAuth();
    const database = getFirebaseDatabase();

    if (!auth.currentUser) {
      console.error('No authenticated user found.');
      return null;
    }

    const userId = auth.currentUser.uid;
    const analyticsRef = ref(database, `users/${userId}/analytics`);
    const snapshot = await get(analyticsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      return {
        habitStats: Array.isArray(data.habitStats) ? data.habitStats : [],
        streaks: Array.isArray(data.streaks) ? data.streaks : [],
        completionRates: Array.isArray(data.completionRates) ? data.completionRates : [],
      };
    } else {
      console.warn(`No analytics data found for user: ${userId}`);
      return { habitStats: [], streaks: [], completionRates: [] };
    }
  } catch (error: any) {
    console.error('Error fetching analytics data:', error.message || error);
    return null;
  }
};
