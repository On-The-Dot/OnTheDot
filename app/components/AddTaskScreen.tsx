import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "@/app/config/firebase_setup";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalDropdown from "react-native-modal-dropdown";

type AddTaskScreenProps = {
  closeTaskModal: () => void;
};

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ closeTaskModal }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [deadlineTime, setDeadlineTime] = useState(new Date());
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("no priority");
  const [calendarId, setCalendarId] = useState("SKoQ3595MveSj0e8f1C7");

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showDeadlineDatePicker, setShowDeadlineDatePicker] = useState(false);
  const [showDeadlineTimePicker, setShowDeadlineTimePicker] = useState(false);

  const handleAddTask = async () => {
    if (
      !description ||
      !location ||
      !startDate ||
      !startTime ||
      !deadlineDate ||
      !deadlineTime
    ) {
      Alert.alert("Validation Error", "Please fill all fields");
      return;
    }

    try {
      // Combine date and time for start and deadline
      const startTimestamp = Timestamp.fromDate(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        )
      );

      const deadlineTimestamp = Timestamp.fromDate(
        new Date(
          deadlineDate.getFullYear(),
          deadlineDate.getMonth(),
          deadlineDate.getDate(),
          deadlineTime.getHours(),
          deadlineTime.getMinutes()
        )
      );

      await addDoc(collection(db, `calendars/${calendarId}/events`), {
        description,
        location,
        start_time: startTimestamp,
        deadline: deadlineTimestamp,
        category,
        priority,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      Alert.alert("Success", "Task added successfully", [
        { text: "OK", onPress: () => closeTaskModal() },
      ]);
    } catch (error) {
      console.error("Error adding task: ", error);
      Alert.alert("Error", "Failed to add task");
    }
  };

  const onChangeDate = (
    event: any,
    selectedDate: Date | undefined,
    setter: React.Dispatch<React.SetStateAction<Date>>,
    toggleVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    toggleVisibility(false);
    const currentDate = selectedDate || new Date();
    setter(currentDate);
  };

  const onChangeTime = (
    event: any,
    selectedTime: Date | undefined,
    setter: React.Dispatch<React.SetStateAction<Date>>,
    toggleVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    toggleVisibility(false);
    const currentTime = selectedTime || new Date();
    setter(currentTime);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeTaskModal} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {startDate ? startDate.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              mode="date"
              value={startDate}
              display="default"
              onChange={(event, selectedDate) =>
                onChangeDate(
                  event,
                  selectedDate,
                  setStartDate,
                  setShowStartDatePicker
                )
              }
            />
          )}
        </View>

        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {startTime ? startTime.toTimeString().slice(0, 5) : "Select Time"}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              mode="time"
              value={startTime}
              display="default"
              onChange={(event, selectedTime) =>
                onChangeTime(
                  event,
                  selectedTime,
                  setStartTime,
                  setShowStartTimePicker
                )
              }
            />
          )}
        </View>
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Deadline Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDeadlineDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {deadlineDate ? deadlineDate.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {showDeadlineDatePicker && (
            <DateTimePicker
              mode="date"
              value={deadlineDate}
              display="default"
              onChange={(event, selectedDate) =>
                onChangeDate(
                  event,
                  selectedDate,
                  setDeadlineDate,
                  setShowDeadlineDatePicker
                )
              }
            />
          )}
        </View>

        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDeadlineTimePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {deadlineTime ? deadlineTime.toTimeString().slice(0, 5) : "Select Time"}
            </Text>
          </TouchableOpacity>
          {showDeadlineTimePicker && (
            <DateTimePicker
              mode="time"
              value={deadlineTime}
              display="default"
              onChange={(event, selectedTime) =>
                onChangeTime(
                  event,
                  selectedTime,
                  setDeadlineTime,
                  setShowDeadlineTimePicker
                )
              }
            />
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <ModalDropdown
          options={["work", "school", "other"]}
          defaultValue={category}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) => setCategory(value as string)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priority</Text>
        <ModalDropdown
          options={["high", "medium", "low", "no priority"]}
          defaultValue={priority}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          onSelect={(index, value) => setPriority(value as string)}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(245,240,228,1.00)",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 25,
    color: "#8e44ad",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D7C0AE",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainerHalf: {
    width: "48%",
  },
  datePickerButton: {
    height: 40,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D7C0AE",
  },
  datePickerText: {
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D7C0AE",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownStyle: {
    width: "100%",
  },
  addButton: {
    height: 50,
    backgroundColor: "#8e44ad",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddTaskScreen;