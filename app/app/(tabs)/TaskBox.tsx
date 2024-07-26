import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import {db} from '../config/firebase_setup'

export default function TaskBox({ selectedDate }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Reference to the events collection for the selected calendar
        const eventsRef = collection(db, "calendars", "calendar_id", "events"); // Replace 'calendar_id' with your actual calendar ID or parameter
        const q = query(
          eventsRef,
          where(
            "start_time",
            ">=",
            new Date(selectedDate).setHours(0, 0, 0, 0)
          ),
          where(
            "start_time",
            "<",
            new Date(selectedDate).setHours(23, 59, 59, 999)
          )
        );

        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => doc.data());
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks for {selectedDate}</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks for this day</Text>
      ) : (
        tasks.map((task, index) => (
          <View key={index} style={styles.taskBox}>
            <Text style={styles.taskTitle}>{task.description}</Text>
            <Text style={styles.taskDetails}>
              Time: {new Date(task.start_time.toDate()).toLocaleTimeString()}
            </Text>
            <Text style={styles.taskDetails}>Location: {task.location}</Text>
            <Text style={styles.taskDetails}>Category: {task.category}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#E8EEF4",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noTasks: {
    fontSize: 16,
    color: "#888888",
  },
  taskBox: {
    marginBottom: 10,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    borderColor: "#dddddd",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDetails: {
    fontSize: 14,
    color: "#555555",
  },
});
