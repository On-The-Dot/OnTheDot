import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


interface Task {
  id: string;
  description: string;
  location: string;
  start_time: { toDate: () => Date } | undefined;
  deadline: { toDate: () => Date } | undefined;
  category: string;
  priority: string;
}

interface TaskBoxProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskBox: React.FC<TaskBoxProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const startTime = task.start_time?.toDate ? task.start_time.toDate() : new Date();
          const endTime = task.deadline?.toDate ? task.deadline.toDate() : new Date();
          const priorityColor = getPriorityColor(task.priority); // Determine color based on priority

          return (
            <View key={task.id} style={styles.taskItem}>
              <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
              <Text style={styles.taskText}>{task.description}</Text>
              <Text style={styles.taskDetails}>Location: {task.location}</Text>
              <Text style={styles.taskDetails}>Start: {startTime.toLocaleString()}</Text>
              <Text style={styles.taskDetails}>End: {endTime.toLocaleString()}</Text>
              <Text style={styles.taskDetails}>Priority: {task.priority}</Text>
              <Text style={styles.taskDetails}>Category: {task.category}</Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionButton}>
                  <Ionicons name="create-outline" size={20} color="blue" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={styles.noTasks}>No tasks for this day</Text>
      )}
    </ScrollView>
  );
};

// Function to get color based on priority
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "yellow";
    default:
      return "gray"; // Default color if no priority is specified
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  taskItem: {
    marginTop: 5,
    backgroundColor: "#E8EEF4",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 5,
    position: "relative", 
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    top: 10,
    left: 10,
  },
  taskText: {
    marginLeft: 25,
    fontSize: 16,
    fontWeight: "500",
  },
  taskDetails: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  noTasks: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 10,
  },
});

export default TaskBox;
