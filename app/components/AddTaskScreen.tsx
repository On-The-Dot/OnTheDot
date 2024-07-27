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
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/navigation";

type AddTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddTask"
>;

type Props = {
  navigation: AddTaskScreenNavigationProp;
};

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [deadlineTime, setDeadlineTime] = useState(new Date());
  const [category, setCategory] = useState("work");
  const [calendarId, setCalendarId] = useState("SKoQ3595MveSj0e8f1C7"); // Set the default calendar ID

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
      const startTimestamp = Timestamp.fromDate(
        new Date(
          startDate.setHours(startTime.getHours(), startTime.getMinutes())
        )
      );

      let deadlineTimestamp;
      if (category === "school") {
        const schoolDeadline = new Date(startDate);
        schoolDeadline.setDate(startDate.getDate() + 7);
        deadlineTimestamp = Timestamp.fromDate(schoolDeadline);
      } else if (category === "work") {
        const workDeadline = new Date(startDate);
        workDeadline.setDate(workDeadline.getDate() + ((5 - workDeadline.getDay() + 7) % 7));
        workDeadline.setHours(17, 0, 0, 0); // 5 PM on the next Friday
        deadlineTimestamp = Timestamp.fromDate(workDeadline);
      } else {
        const otherDeadline = new Date(startDate);
        otherDeadline.setHours(17, 0, 0, 0); // 5 PM on the same day
        deadlineTimestamp = Timestamp.fromDate(otherDeadline);
      }

      await addDoc(collection(db, `calendars/${calendarId}/events`), {
        description,
        location,
        start_time: startTimestamp,
        deadline: deadlineTimestamp,
        category,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      Alert.alert("Success", "Task added successfully");
      navigation.goBack(); 
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

      <View style={styles.inputContainer}>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Time</Text>
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

      <View style={styles.inputContainer}>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Deadline Time</Text>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Category"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  datePickerButton: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    height: 45,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTaskScreen;
