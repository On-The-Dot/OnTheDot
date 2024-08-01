import React from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
} from "react-native";
// import ScrollableTabView from "react-native-scrollable-tab-view";
import { TimeSpentChart, TaskPriorityChart } from "../../components/Charts";
import * as Progress from "react-native-progress"; // https://medium.com/@jujunsetiawan10/how-to-create-progress-bar-in-react-native-f27ae2871ac3
// import { YStack } from "tamagui";
import UpcomingTasks from "../../components/ProgressUpcoming";
import "babel-polyfill";

const ProgressTrackerPage = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Weekly Tasks Overview</Text>
        <TimeSpentChart />
        <TaskPriorityChart />
        <Text style={styles.title}>Tasks In Progress</Text>
        <Progress.Bar
          progress={0.5}
          width={200}
          height={20}
          color="rgba(238, 227, 203, 1)"
        />
        <Text style={styles.title}>Upcoming Tasks</Text>
        <UpcomingTasks />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 25,
  },
  textbox: {
    height: 100,
    width: 400,
    borderColor: "lightgray",
    borderWidth: 1,
  },
});

export default ProgressTrackerPage;
