import {
    collection,
    getDocs,
    query,
    where,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "@/app/config/firebase_setup";
  
  const fetchTasks = async (selectedDate) => {
    try {
      // Convert selectedDate to Firestore Timestamp
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 1); // End of the day
  
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
  
      
      const calendarId = "SKoQ3595MveSj0e8f1C7";
      const tasksRef = collection(db, `calendars/${calendarId}/events`);
  
      // Create a query to get tasks within the selected date range
      const q = query(
        tasksRef,
        where("start_time", "<=", endTimestamp),
        where("deadline", ">=", startTimestamp)
      );
  
      // Fetch tasks from Firestore
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return tasksData;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };
  
  export default fetchTasks;
  