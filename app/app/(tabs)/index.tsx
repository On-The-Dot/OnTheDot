import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import TaskBox from "../../components/TaskBox";
import { Ionicons } from "@expo/vector-icons";
import fetchTasks from "../../components/fetchTasks"; 

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [calendarId, setCalendarId] = useState('SKoQ3595MveSj0e8f1C7');

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchTasksData = async () => {
      const tasksData = await fetchTasks(selectedDate);
      setTasks(tasksData);
    };

    fetchTasksData();
  }, [selectedDate, calendarId]);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "rgba(245,240,228,1.00)",
            calendarBackground: "#E8EEF4",
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
      <View style={styles.taskContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TaskBox tasks={tasks} />
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.overlay} onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Add Task</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => console.log("Add Task")}
              >
                <Ionicons name="create" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Add Work Shift</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => console.log("Add Work Shift")}
              >
                <Ionicons name="briefcase" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Study Groups</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => console.log("Study Groups")}
              >
                <Ionicons name="book" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Sync Calendars</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => console.log("Sync Calendars")}
              >
                <Ionicons name="sync" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.exitButtonText}>Exit</Text>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={handleCloseModal}
              >
                <Ionicons name="exit" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,240,228,1.00)",
    // Background color for the whole screen
  },
  calendarContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "rgba(245,240,228,1.00)",
    zIndex: 1,
    elevation: 1,
  },
  calendar: {
    borderWidth: 0,
    borderRadius: 15, // More rounded corners
    height: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
    bottom: 65,
    right: 20,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    elevation: 10,
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  exitButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  exitButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
