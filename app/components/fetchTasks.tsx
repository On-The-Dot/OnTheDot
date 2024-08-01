import {
    collection,
    getDocs,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import { db } from "@/app/config/firebase_setup";

const fetchTasks = async (selectedDate: string, calendarId: string) => {
    try {
        console.log('Fetching tasks for calendar:', calendarId);
        console.log('Selected Date:', selectedDate);
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 1);

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);

        const tasksRef = collection(db, `calendars/${calendarId}/events`);

        const q = query(
            tasksRef,
            where("start_time", "<=", endTimestamp),
            where("deadline", ">=", startTimestamp)
        );

        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Fetched tasks:', tasksData);
        return tasksData;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export default fetchTasks;