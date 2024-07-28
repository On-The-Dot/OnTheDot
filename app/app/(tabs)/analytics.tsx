import React from "react";
import { StyleSheet, ScrollView, StatusBar, Text, View } from "react-native";
// import ScrollableTabView from "react-native-scrollable-tab-view";
import { TimeSpentChart } from "../../components/PieChart";
// import { YStack } from "tamagui";
import "babel-polyfill";

const ProgressTrackerPage = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Weekly Time Spent</Text>
        <TimeSpentChart />
        <Text style={styles.title}>Tasks In Progress</Text>
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
});

export default ProgressTrackerPage;
