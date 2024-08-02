import { Dimensions } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit"; // https://www.npmjs.com/package/react-native-chart-kit
import { buildCategoryData, buildPriorityData } from "./fetchWeeklyTasks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetchCalendarId } from "./fetchCalendarId";

/* hardcode
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
*/

// schoolHours += entry.data().start_time.toDate().getTime();

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(150, 126, 118, ${opacity})`,
};

export function TimeSpentChart() {
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [categoryTasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const getCalendarId = async () => {
      const id = await fetchCalendarId();
      setCalendarId(id);
    };
    void getCalendarId();
  }, []);

  console.log("in analytics, calendar id: ", calendarId);

  useEffect(() => {
    const fetchTasksData = async () => {
      const taskCategoryCount = await buildCategoryData(calendarId);
      setTasks(taskCategoryCount);
    };
    fetchTasksData();
  }, [calendarId]);

  // var taskCategoryCount: {
  //   name: string;
  //   tasks: number;
  //   color: string;
  //   legendFontColor: string;
  //   legendFontSize: number;
  // }[][] = [];

  // const data = buildCategoryData(calendarId);
  // data.then((value) => {
  //   console.log(value);
  //   taskCategoryCount.push(value);
  // });

  console.log("category data: ", categoryTasks);

  return (
    <PieChart
      data={categoryTasks} // {taskCategoryCount[0]}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={chartConfig}
      accessor={"tasks"} // weekly // instead of "time" (future implementation?)
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      // center={[10, 50]}
    />
  );
}

export function TaskPriorityChart() {
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [priorityTasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const getCalendarId = async () => {
      const id = await fetchCalendarId();
      setCalendarId(id);
    };
    void getCalendarId();
  }, []);

  console.log("in analytics, calendar id: ", calendarId);

  useEffect(() => {
    const fetchTasksData = async () => {
      const taskPriorityCount = await buildPriorityData(calendarId);
      setTasks(taskPriorityCount);
    };
    fetchTasksData();
  }, [calendarId]);

  // const pdata = buildPriorityData(calendarId);
  // var prioritydata: { labels: string[]; datasets: { data: number[] }[] }[][] =
  //   [];

  // pdata.then((value) => {
  //   console.log(value);
  //   prioritydata.push(value);
  // });

  console.log("priority data: ", priorityTasks);

  return (
    <BarChart
      data={priorityTasks[0]}
      width={Dimensions.get("window").width}
      height={250}
      fromZero={true}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={chartConfig}
      verticalLabelRotation={0}
      showValuesOnTopOfBars={true}
    />
  );
}
