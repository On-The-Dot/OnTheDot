import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemedView } from "@/components/ThemedView";
import TaskBox from "../TaskBox"; // Make sure the path is correct
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [modalVisible, setModalVisible] = useState(false);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#E8EEF4",
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
      <TaskBox selectedDate={selectedDate} />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for More Options - Add Button */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.overlay} onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            {/* Add Task */}
            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Add Task </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Add Task')}>
                <Ionicons name="create" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Add Work Shift */}
            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Add Work Shift </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Add Work Shift')}>
                <Ionicons name="briefcase" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Study Groups */}
            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Study Groups </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Study Groups')}>
                <Ionicons name="book" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Sync Calendars */}
            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Sync Calendars </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Sync Calendars')}>
                <Ionicons name="sync" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Exit */}
            <View style={styles.modalItem}>
              <Text style={styles.exitButtonText}>Exit </Text>
              <TouchableOpacity style={styles.exitButton} onPress={handleCloseModal}>
                <Ionicons name="exit" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
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
    marginBottom: 15,
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
    backgroundColor: '#E8EEF4', 
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8e44ad', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 65, 
    right: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  modalButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8e44ad', 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10, 
    elevation: 10, 
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  exitButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8e44ad', 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    elevation: 10, 
  },
  exitButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
