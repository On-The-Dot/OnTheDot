import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TestChart from "@/components/PieChart";

const progress_tracker = () => {
  return (
    <View>
      <Text>progress_tracker</Text>
      <TestChart></TestChart>
    </View>
  );
};

export default progress_tracker;

const styles = StyleSheet.create({});
