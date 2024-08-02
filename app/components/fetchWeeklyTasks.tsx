import {
  collection,
  query,
  where,
  Timestamp,
  getCountFromServer, // https://firebase.google.com/docs/firestore/query-data/aggregation-queries
} from "firebase/firestore";
import { db } from "@/app/config/firebase_setup";
// import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { fetchCalendarId } from "@/components/fetchCalendarId";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

async function buildCategoryData(calendarId: string | null) {
  //   const promiseCalendarId = fetchCalendarId();
  //   var calendarId: (string | null)[] = [];
  //   promiseCalendarId.then((value) => {
  //     console.log("in analytics, calendar id: ", value);
  //     calendarId.push(value);
  //   });

  if (calendarId != null) {
    console.log(`calendars/${calendarId}/events`);
    const tasksRef = collection(db, `calendars/${calendarId}/events`);

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
    console.log(databaseData);
    return databaseData;
  } else {
    console.log("no user signed in");
    const databaseData = [
      {
        name: "school",
        tasks: 0,
        color: "#967e76",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "work",
        tasks: 0,
        color: "#baa29a",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "other",
        tasks: 0,
        color: "rgba(215, 192, 174, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];
    // const data = Promise.resolve(databaseData);
    return databaseData;
  }
}

async function buildPriorityData(calendarId: string | null) {
  //   const promiseCalendarId = fetchCalendarId();
  //   var calendarId: (string | null)[] = [];
  //   promiseCalendarId.then((value) => {
  //     console.log("in analytics, calendar id: ", value);
  //     calendarId.push(value);
  //   });

  if (calendarId != null) {
    console.log(`calendars/${calendarId}/events`);
    const tasksRef = collection(db, `calendars/${calendarId}/events`);

    const noneq = query(
      tasksRef,
      where("priority", "==", "no priority"),
      where("start_time", ">=", intervalStartTimestamp),
      where("start_time", "<=", currentTimestamp)
    );

    const noPrioritySnapshot = await getCountFromServer(noneq);
    console.log(
      "count of no priority events: ",
      noPrioritySnapshot.data().count
    );

    const lowq = query(
      tasksRef,
      where("priority", "==", "low"),
      where("start_time", ">=", intervalStartTimestamp),
      where("start_time", "<=", currentTimestamp)
    );

    const lowPrioritySnapshot = await getCountFromServer(lowq);
    console.log(
      "count of low priority events: ",
      lowPrioritySnapshot.data().count
    );

    const midq = query(
      tasksRef,
      where("priority", "==", "medium"),
      where("start_time", ">=", intervalStartTimestamp),
      where("start_time", "<=", currentTimestamp)
    );

    const mediumPrioritySnapshot = await getCountFromServer(midq);
    console.log(
      "count of medium priority events: ",
      mediumPrioritySnapshot.data().count
    );

    const highq = query(
      tasksRef,
      where("priority", "==", "high"),
      where("start_time", ">=", intervalStartTimestamp),
      where("start_time", "<=", currentTimestamp)
    );

    const highPrioritySnapshot = await getCountFromServer(highq);
    console.log(
      "count of high priority events: ",
      highPrioritySnapshot.data().count
    );

    const databaseData = [
      {
        labels: [
          "no priority",
          "low priority",
          "medium priority",
          "high priority",
        ],
        datasets: [
          {
            data: [
              noPrioritySnapshot.data().count,
              lowPrioritySnapshot.data().count,
              mediumPrioritySnapshot.data().count,
              highPrioritySnapshot.data().count,
            ],
          },
        ],
      },
    ];
    console.log(databaseData);
    return databaseData;
  } else {
    console.log("no user signed in");
    const databaseData = [
      {
        labels: [
          "no priority",
          "low priority",
          "medium priority",
          "high priority",
        ],
        datasets: [
          {
            data: [0, 0, 0, 0],
          },
        ],
      },
    ];
    return databaseData;
  }
}

export { buildCategoryData, buildPriorityData };

// var taskCategoryCount: {
//   name: string;
//   tasks: number;
//   color: string;
//   legendFontColor: string;
//   legendFontSize: number;
// }[][] = [];

// var prioritydata: { labels: string[]; datasets: { data: number[] }[] }[][] = [];

// /*
// const [calendarId, setCalendarId] = useState<string | null>(null);
// const [user, setUser] = useState<any>(null);

// function getCalendarId() {
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         const id = await fetchCalendarId();
//         setCalendarId(id);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);
// }

// getCalendarId();
// */

// // console.log(calendarId[0]);
// const data = buildCategoryData();
// data.then((value) => {
//   console.log(value);
//   taskCategoryCount.push(value);
// });

// console.log("category data: ", taskCategoryCount);

// const pdata = buildPriorityData();
// pdata.then((value) => {
//   console.log(value);
//   prioritydata.push(value);
// });

// console.log("priority data: ", prioritydata);

// export { taskCategoryCount, prioritydata };

// potential problem: "Cannot read 'map' of undefined' error" appears on save then goes away if save again
