import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

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

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export function TimeSpentChart() {
  return (
    <PieChart
      data={data}
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
