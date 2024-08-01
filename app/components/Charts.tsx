import { Dimensions } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit"; // https://www.npmjs.com/package/react-native-chart-kit
import { taskCategoryCount, prioritydata } from "./fetchWeeklyTasks";

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
  return (
    <PieChart
      data={taskCategoryCount[0]}
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
  return (
    <BarChart
      data={prioritydata[0][0]}
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
