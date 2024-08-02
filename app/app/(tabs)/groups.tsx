import { View, ScrollView, Text, TextInput, TouchableOpacity, Button, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExternalLink } from "@/components/ExternalLink";
import { db } from "../config/firebase_setup";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface StudyGroup {
  id: string;
  description: string;
  endTime: number;
  location: string;
  members: Array<string>;
  name: string;
  type: string;
  startTime: number;
}

export default function GroupsPage() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsSnapshot = await getDocs(collection(db, "studyGroups"));
        const groupsArray = groupsSnapshot.docs.map(
          (group: QueryDocumentSnapshot<DocumentData>) => ({
            id: group.id,
            ...group.data(),
            endTime: group.data().endTime["seconds"],
            startTime: group.data().startTime["seconds"],
          })
        ) as StudyGroup[];

        setStudyGroups(
          groupsArray.sort((a, b) => {
            return b["startTime"] - a["startTime"];
          })
        );
      } catch (error) {
        console.error("Error fetching study groups: ", error);
      }
    };

    fetchGroups();
  }, []);

  const convertTime = (seconds:number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let time = new Date(seconds * 1000);
    let day = time.getDay()
    let monthNum = time.getMonth();
    let date = time.getDate();
    return `${days[day]} ${months[monthNum]} ${date}  ${time.getHours()}:${time.getMinutes()}`;
  }

  const onPress = () => {};

  return (
    <View
      style={{
        backgroundColor: "rgba(245,240,228,1.00)",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(217,217,217,0.86)",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            marginLeft: 20,
            marginRight: 10,
            width: "80%",
          }}
        >
          <TextInput>Search</TextInput>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="search" size={25} style={{ margin: 5 }}></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 20,
          paddingBottom: 50
        }}
      >
        {studyGroups.map((group) => {
          return (
            <View
              key={group.id}
              style={{
                backgroundColor: "rgba(215,192,174,0.47)",
                width: "87%",
                // height: 100,
                margin: 6,
                paddingTop: 13,
                paddingLeft: 13,
                paddingRight: 13,
                paddingBottom: 8,
              }}
            >
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 5,
                  color: "#8e44ad",
                }}
              >
                {group.name}
              </Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>Start Time: </Text>
                {convertTime(group.startTime)}
              </Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>End Time: </Text>
                {convertTime(group.endTime)}
              </Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>Location: </Text>
                <ExternalLink
                  href={group.location}
                  style={{ color: "rgba(0,102,204,1)" }}
                >
                  {group.location}
                </ExternalLink>
              </Text>
              <Text style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 600 }}>Note: </Text>
                {group.description}
              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 30, marginRight: 30 }}>
                {group.members.length === 1 ? (
                  <Text style={{ color: "rgba(17,16,16,0.60)", marginTop: 15 }}>
                    1 attendee
                  </Text>
                ) : (
                  <Text style={{ color: "rgba(17,16,16,0.60)", marginTop: 15 }}>
                    {group.members.length} attendees
                  </Text>
                )}
                <TouchableOpacity style={{ backgroundColor: "purple", width: 60, alignItems: "center", padding: 5, borderRadius: 20, alignSelf: "flex-end", marginTop: 10 }} onPress={() => {alert("Under construction")}}>
                  <Text style={{ color: "white" }}>Attend</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          );
        })}
      </ScrollView>

      {/* <View
        style={{
          width: 60,
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Button
          onPress={() => alert("New button pressed")}
          title="New"
          color="rgba(80,88,225,0.72)"
          accessibilityLabel="button to create a new study group"
        />
      </View> */}
    </View>
  );
}
