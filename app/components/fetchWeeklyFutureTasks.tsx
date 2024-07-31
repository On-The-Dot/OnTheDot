import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/config/firebase_setup";

function getNextWeekDate() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const day = today.getDate();
  var month_nextweek = month;
  var year_nextweek = year;
  var day_nextweek = day + 7;
  if (month == 11) {
    if (day_nextweek > 31) {
      // next week is in a new year
      day_nextweek -= 31;
      month_nextweek = 0;
      year_nextweek += 1;
    }
  } else if (month == 1) {
    // February (leap year?)
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          if (day_nextweek > 29) {
            day_nextweek -= 29;
            month_nextweek += 1;
          }
        } else {
          if (day_nextweek > 28) {
            day_nextweek -= 28;
            month_nextweek += 1;
          }
        }
      } else {
        if (day_nextweek > 29) {
          day_nextweek -= 29;
          month_nextweek += 1;
        }
      }
    } else {
      if (day_nextweek > 28) {
        day_nextweek -= 28;
        month_nextweek += 1;
      }
    }
  } else if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9
  ) {
    if (day_nextweek > 31) {
      day_nextweek -= 31;
      month_nextweek += 1;
    }
  } else {
    if (day_nextweek > 30) {
      day_nextweek -= 30;
      month_nextweek += 1;
    }
  }
  return new Date(year_nextweek, month_nextweek, day_nextweek);
}

const fetchFutureTasks = async (calendarId: string) => {
  try {
    console.log("Fetching tasks for calendar:", calendarId);
    const startDate = new Date();
    console.log("Present Date:", startDate);
    const endDate = getNextWeekDate();
    console.log("Future Date: ", endDate);

    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    const tasksRef = collection(db, `calendars/${calendarId}/events`);

    const q = query(
      tasksRef,
      where("start_time", ">=", startTimestamp),
      where("start_time", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched tasks:", tasksData);
    return tasksData;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export default fetchFutureTasks;
