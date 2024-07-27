import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Task {
  id: string;
  description: string;
  location: string;
  start_time: { toDate: () => Date } | undefined;
  end_time: { toDate: () => Date } | undefined;
  category: string;
}

interface TaskBoxProps {
  tasks: Task[];
}

const TaskBox: React.FC<TaskBoxProps> = ({ tasks }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const startTime = task.start_time?.toDate ? task.start_time.toDate() : new Date();
          const endTime = task.end_time?.toDate ? task.end_time.toDate() : new Date();
          return (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.description}</Text>
              <Text style={styles.taskDetails}>Location: {task.location}</Text>
              <Text style={styles.taskDetails}>
                Start: {startTime.toLocaleString()}
              </Text>
              <Text style={styles.taskDetails}>
                End: {endTime.toLocaleString()}
              </Text>
              <Text style={styles.taskDetails}>Category: {task.category}</Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.noTasks}>No tasks for this day</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  taskItem: {
    backgroundColor: "#E8EEF4", 
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
  },
  taskDetails: {
    fontSize: 14,
    color: "#666",
  },
  noTasks: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default TaskBox;
