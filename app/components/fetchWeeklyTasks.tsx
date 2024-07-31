import {
  collection,
  query,
  where,
  Timestamp,
  getCountFromServer, // https://firebase.google.com/docs/firestore/query-data/aggregation-queries
} from "firebase/firestore";
import { db } from "@/app/config/firebase_setup";

function getPriorWeekDate() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const day = today.getDate();
  var month_priorweek = month;
  var year_priorweek = year;
  var day_priorweek = day - 7;
  if (day_priorweek <= 0) {
    if (month == 0) {
      // prior week is in December
      month_priorweek = 11;
      year_priorweek -= 1;
      day_priorweek += 31;
    } else if (month == 2) {
      // prior week is in February (leap year?)
      month_priorweek = 1;
      if (year % 4 == 0) {
        if (year % 100 == 0) {
          if (year % 400 == 0) {
            day_priorweek += 29;
          } else {
            day_priorweek += 28;
          }
        } else {
          day_priorweek += 29;
        }
      } else {
        day_priorweek += 28;
      }
    } else if (
      month == 1 ||
      month == 3 ||
      month == 5 ||
      month == 7 ||
      month == 8 ||
      month == 10
    ) {
      month_priorweek -= 1;
      day_priorweek += 31;
    } else {
      month_priorweek -= 1;
      day_priorweek += 30;
    }
  }
  return new Date(year_priorweek, month_priorweek, day_priorweek);
}

const intervalStartDate = getPriorWeekDate();
const intervalStartTimestamp = Timestamp.fromDate(intervalStartDate);
const currentDate = new Date();
const currentTimestamp = Timestamp.fromDate(currentDate);

async function buildData() {
  const tasksRef = collection(db, "calendars/SKoQ3595MveSj0e8f1C7/events");

  const schoolq = query(
    tasksRef,
    where("category", "==", "school"),
    where("start_time", ">=", intervalStartTimestamp),
    where("start_time", "<=", currentTimestamp)
  );

  const schoolSnapshot = await getCountFromServer(schoolq);
  console.log("count of weekly school tasks: ", schoolSnapshot.data().count);

  const workq = query(
    tasksRef,
    where("category", "==", "work"),
    where("start_time", ">=", intervalStartTimestamp),
    where("start_time", "<=", currentTimestamp)
  );

  const workSnapshot = await getCountFromServer(workq);
  console.log("count of weekly work tasks: ", workSnapshot.data().count);

  const otherq = query(
    tasksRef,
    where("category", "==", "other"),
    where("start_time", ">=", intervalStartTimestamp),
    where("start_time", "<=", currentTimestamp)
  );

  const otherSnapshot = await getCountFromServer(otherq);
  console.log(
    "count of weekly non-school non-work tasks: ",
    otherSnapshot.data().count
  );

  const databaseData = [
    {
      name: "school",
      tasks: schoolSnapshot.data().count,
      color: "#967e76",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "work",
      tasks: workSnapshot.data().count,
      color: "#baa29a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "other",
      tasks: otherSnapshot.data().count,
      color: "rgba(215, 192, 174, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  // const data = Promise.resolve(databaseData);
  return databaseData;
}

var taskCount: {
  name: string;
  tasks: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}[][] = [];

const data = buildData();
data.then((value) => {
  console.log(value);
  taskCount.push(value);
});

console.log(taskCount);
export default taskCount;
