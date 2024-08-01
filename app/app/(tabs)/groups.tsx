import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import Header from "@/components/Header";
import StudyGroupTab from "@/components/StudyGroupTab";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { db } from "../config/firebase_setup";
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
  members: Array<string>;
  name: string;
  type: string;
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
          })
        ) as StudyGroup[];

        setStudyGroups(groupsArray);
      } catch (error) {
        console.error("Error fetching study groups: ", error);
      }
    };

    fetchGroups();
  }, []);

  const onPress = () => {};

  return (
    <View
      style={{
        backgroundColor: "rgba(245,240,228,1.00)",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <Header /> */}
      <View
        style={{
          marginTop: 20,
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
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
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
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  {group.name}
                </Text>
                <Text>{group.description}</Text>
                <Text style={{ color: "rgba(17,16,16,0.60)", marginTop: 15 }}>
                  {group.members.length} members
                </Text>
              </View>
          );
        })}
      </View>

      <View
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
      </View>
    </View>
  );
}
