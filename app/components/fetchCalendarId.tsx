import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app/config/firebase_setup'; 

export const fetchCalendarId = async (): Promise<string | null> => {
  try {
    const user = getAuth().currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.calendarId || null; 
      } else {
        console.error('User document does not exist');
        return null;
      }
    } else {
      console.error('No user is currently signed in');
      return null;
    }
  } catch (error) {
    console.error('Error fetching calendar ID:', error);
    return null;
  }
};
