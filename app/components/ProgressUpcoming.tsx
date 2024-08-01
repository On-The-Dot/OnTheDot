import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import TaskBox from "./TaskBox";
import fetchFutureTasks from "./fetchWeeklyFutureTasks";

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  //hard-coded the calendarId for now but this should auto-populate
  //depending on which user is logged in
  const [calendarId, setCalendarId] = useState("SKoQ3595MveSj0e8f1C7");

  useEffect(() => {
    const fetchTasksData = async () => {
      const tasksData = await fetchFutureTasks(calendarId);
      setTasks(tasksData);
    };

    fetchTasksData();
  }, [calendarId]);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TaskBox
            tasks={tasks}
            onEdit={function (task): void {
              throw new Error("Function not implemented.");
            }}
            onDelete={function (taskId: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});
