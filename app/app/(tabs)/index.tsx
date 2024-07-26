import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemedView } from "@/components/ThemedView";
import TaskBox from "./TaskBox"; // Make sure the path is correct

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#f9f9f9", 
            calendarBackground: "#ffffff", 
            textSectionTitleColor: "#6d6e71", 
            selectedDayBackgroundColor: "#007bff",
            selectedDayTextColor: "#ffffff", 
            todayTextColor: "#ff5722", 
            dayTextColor: "#333333",
            textDisabledColor: "#b0b0b0", 
            dotColor: "#007bff", 
            selectedDotColor: "#ffffff", 
            arrowColor: "#007bff", 
            monthTextColor: "#333333", 
            indicatorColor: "#007bff", 
            textDayFontFamily: "Arial", 
            textMonthFontFamily: "Arial", 
            textDayHeaderFontFamily: "Arial", 
            textDayFontWeight: "400",
            textMonthFontWeight: "600",
            textDayHeaderFontWeight: "400",
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      <TaskBox selectedDate={selectedDate} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  calendarContainer: {
    marginTop: 20,
    marginBottom: 15, // Adjusted bottom margin to separate calendar and tasks
    paddingHorizontal: 1,
  },
  calendar: {
    borderWidth: 0,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 360,
  },
});
