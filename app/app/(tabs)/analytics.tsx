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
import { TimeSpentChart } from "../../components/PieChart";
// import { YStack } from "tamagui";
import "babel-polyfill";

const ProgressTrackerPage = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Weekly Tasks Overview</Text>
        <TimeSpentChart />
        <Text style={styles.title}>Tasks In Progress</Text>

        <TextInput
          style={styles.textbox}
          defaultValue="Enter any notes here ..."
        />
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
    height: 250,
    width: 400,
    borderColor: "lightgray",
    borderWidth: 1,
  },
});

export default ProgressTrackerPage;
