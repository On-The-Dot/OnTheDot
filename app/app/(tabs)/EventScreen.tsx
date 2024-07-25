import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type EventScreenRouteProp = RouteProp<any, "Event">;
type EventScreenNavigationProp = NativeStackNavigationProp<any>;

type Props = {
  route: EventScreenRouteProp;
  navigation: EventScreenNavigationProp;
};

const EventScreen: React.FC<Props> = ({ route }) => {
  const { date } = route.params;
  const [event, setEvent] = useState<string>("");

  const saveEvent = () => {
    // Logic to save the event
    console.log(`Event on ${date}: ${event}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Event for {date}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event details"
        value={event}
        onChangeText={setEvent}
      />
      <Button title="Save Event" onPress={saveEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  text: { textAlign: "center", margin: 10, fontSize: 18 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EventScreen;
