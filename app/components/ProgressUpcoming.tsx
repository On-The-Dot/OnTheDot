import React, { useState, useEffect } from "react";
import TaskBox from "./TaskBox";
import fetchFutureTasks from "./fetchWeeklyFutureTasks";
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
import EditTaskScreen from "../components/EditTaskScreen";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { fetchCalendarId } from "@/components/fetchCalendarId";
import { db } from "@/app/config/firebase_setup";

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [editTaskModalVisible, setEditTaskModalVisible] =
    useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<any>(null);

  const promiseCalendarId = fetchCalendarId();
  var calendarId: (string | null)[] = [];
  promiseCalendarId.then((value) => {
    console.log("calendar id: ", value);
    calendarId.push(value);
  });

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
                doc(db, `calendars/${calendarId[0]}/events`, taskId)
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
      if (calendarId[0] != null) {
        const tasksData = await fetchFutureTasks(calendarId[0]);
        setTasks(tasksData);
      }
    };
    fetchTasksData();
  }, [calendarId]);

  if (calendarId[0] != null) {
    return (
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TaskBox
              tasks={tasks}
              onEdit={openEditTaskModal} // function (task): void {
              // alert("Please edit task on Calendar screen.");
              // throw new Error("Function not implemented.");}
              onDelete={handleDeleteTask} // {function (taskId: string): void {
              // alert("Please delete task from Calendar screen.");
              // throw new Error("Function not implemented.");}
            />
          </ScrollView>
        </View>
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
  } else {
    return (
      <Text style={styles.noTasks}>
        There are no upcoming tasks for the week. Relax and enjoy!
      </Text>
    );
  }
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
  noTasks: {
    fontSize: 18,
    marginHorizontal: 20,
    textAlign: "center",
  },
});
