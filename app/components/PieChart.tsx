import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit"; // https://www.npmjs.com/package/react-native-chart-kit
import { db } from "../app/config/firebase_setup";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  query,
  where,
} from "firebase/firestore/lite";
// import fetchWeeklyTasks from "./fetchWeeklyTasks";
import { databaseData } from "./fetchWeeklyTasks";

const data = [
  {
    name: "school",
    hours: 20,
    color: "#967e76",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "work",
    hours: 16,
    color: "#baa29a",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "clubs",
    hours: 8,
    color: "rgba(215, 192, 174, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "sports/exercise",
    hours: 10,
    color: "rgb(238, 227, 203)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

/*
const schoolEventsList = async () => {
  const [schoolEvents, setSchoolEvents] = useState<
    Array<QueryDocumentSnapshot>
  >([]);
  useEffect(() => {
    const getSchoolEvents = async () => {
      const eventsRef = collection(db, "calendars/SKoQ3595MveSj0e8f1C7/events");
      const qSchoolRef = query(
        eventsRef,
        where("start_time", ">=", getPriorWeekDate()),
        where("category", "==", "school")
      );
      const querySchoolEventsSnapshot = await getDocs(qSchoolRef);
      setSchoolEvents(querySchoolEventsSnapshot.docs);
    };
    void getSchoolEvents();
  }, []);
  const schoolEventsData = schoolEvents;
  return schoolEventsData;
};

function sumHours() {
  const schoolData = schoolEventsList();
  let schoolHours = 0;
  schoolData.map((entry) => {
    schoolHours += entry.data().start_time.toDate().getTime();
  });

  const workData = workEventsList();
  let workHours = 0;
  for (var hours in workData) {
    workHours += Number(hours);
  }

  const otherData = otherEventsList();
  let otherHours = 0;
  for (var hours in otherData) {
    otherHours += Number(hours);
  }

  return [schoolHours, workHours, otherHours];
}

const databaseData = [
  {
    name: "school",
    hours: sumHours()[0],
    color: "#967e76",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "work",
    hours: sumHours()[1],
    color: "#baa29a",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "other",
    hours: sumHours()[2],
    color: "rgba(215, 192, 174, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
*/

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export function TimeSpentChart() {
  // const [databaseData, setDatabaseData] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchDatabaseData = async () => {
  //     const tasksData = await fetchWeeklyTasks();
  //     setDatabaseData(tasksData);
  //   };

  //   fetchDatabaseData();
  // }, []);

  return (
    <PieChart
      data={databaseData}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={chartConfig}
      accessor={"hours"} // weekly
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      // center={[10, 50]}
    />
  );
}
