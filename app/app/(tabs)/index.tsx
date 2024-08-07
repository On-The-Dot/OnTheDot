import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TaskBox from "../../components/TaskBox";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import fetchTasks from "../../components/fetchTasks";
import AddTaskScreen from "../../components/AddTaskScreen";
import EditTaskScreen from "../../components/EditTaskScreen";
import SyncCalendarScreen from "../../components/SyncCalendarScreen";
import { format, parseISO } from "date-fns";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase_setup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchCalendarId } from "@/components/fetchCalendarId";
import { updateMarkedDates } from "../../components/dateUtils";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
  const [editTaskModalVisible, setEditTaskModalVisible] =
    useState<boolean>(false);
  const [syncCalendarkModalVisible, setSyncCalendarVisible] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const id = await fetchCalendarId();
        setCalendarId(id);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  //format date: July 27 2024
  const formattedDate = format(parseISO(selectedDate), "MMMM dd yyyy");

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openTaskModal = () => {
    setTaskModalVisible(true);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
  };

  const openSyncCalendarModal = () => {
    setSyncCalendarVisible(true);
  };

  const closeSyncCalendarModal = () => {
    setSyncCalendarVisible(false);
  };

  const openEditTaskModal = (task: any) => {
    console.log("Opening edit modal for task:", task);
    setCurrentTask(task);
    setEditTaskModalVisible(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalVisible(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, `calendars/${calendarId}/events`, taskId)
              );
              setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId)
              );
            } catch (error) {
              console.error("Error deleting task:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    const fetchTasksData = async () => {
      if (calendarId) {
        try {
          const tasksData = await fetchTasks(selectedDate, calendarId);
          setTasks(tasksData);
          updateMarkedDates(tasksData, setMarkedDates);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasksData();
  }, [selectedDate, calendarId, user]);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          markingType={"multi-dot"}
          markedDates={markedDates}
          theme={{
            backgroundColor: "rgba(245,240,228,1.00)",
            calendarBackground: "#E8EEF4",
            textSectionTitleColor: "#6d6e71",
            selectedDayBackgroundColor: "#007bff",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#8e44ad",
            dayTextColor: "#333333",
            textDisabledColor: "#b0b0b0",
            dotColor: "#007bff",
            selectedDotColor: "#ffffff",
            arrowColor: "#8e44ad",
            monthTextColor: "#333333",
            indicatorColor: "#007bff",
            textDayFontFamily: "SpaceMono",
            textMonthFontFamily: "SpaceMono",
            textDayHeaderFontFamily: "SpaceMono",
            textDayFontWeight: "400",
            textMonthFontWeight: "600",
            textDayHeaderFontWeight: "400",
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      <Text style={styles.selectedDay}>{formattedDate}</Text>
      <View style={styles.taskContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TaskBox
            tasks={tasks}
            onEdit={openEditTaskModal}
            onDelete={handleDeleteTask}
          />
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
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
                onPress={openTaskModal}
              >
                <Ionicons name="create" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Analysis</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => navigation.navigate('analytics' as never)}
              >
                <MaterialCommunityIcons
                  name="chart-bubble"
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Study Groups</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => navigation.navigate('groups' as never)}
              >
                <Ionicons name="book" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.modalButtonText}>Sync Calendars</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openSyncCalendarModal}
              >
                <FontAwesome name="qrcode" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalItem}>
              <Text style={styles.exitButtonText}>Exit </Text>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={handleCloseModal}
              >
                <Feather name="x" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={taskModalVisible}
        onRequestClose={closeTaskModal}
      >
        <AddTaskScreen closeTaskModal={closeTaskModal} />
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={syncCalendarkModalVisible}
        onRequestClose={closeSyncCalendarModal}
      >
        <SyncCalendarScreen closeSyncCalendarModal={closeSyncCalendarModal} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={editTaskModalVisible}
        onRequestClose={closeEditTaskModal}
      >
        <EditTaskScreen
          closeEditTaskModal={closeEditTaskModal}
          taskId={currentTask?.id}
        />
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
    borderRadius: 15,
    height: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  selectedDay: {
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 2,
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
    elevation: 15,
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
    fontWeight: "500",
  },
  exitButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    elevation: 10,
  },
  exitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});