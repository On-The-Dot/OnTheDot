import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import Header from "@/components/Header";
import StudyGroupTab from "@/components/StudyGroupTab";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";


export default function GroupsPage() {
  const onPress = () => {

  }
  let fakeGroups = [
    {
      name: "SNHU", 
      numOfMembers: 3, 
      status: "member"
    },
    {
      name: "Fashion", 
      numOfMembers: 24, 
      status: "join"
    },
    {
      name: "Literature",
      numOfMembers: 13,
      status: "join"
    }
  ]

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
        {fakeGroups.map((group) => {
          return (
            <Link href="/index" asChild>
              <View
                style={{
                  backgroundColor: "rgba(215,192,174,0.47)",
                  width: "87%",
                  height: 100,
                  margin: 6,
                  padding: 13,
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
                <Text>{group.numOfMembers} members</Text>
                <Text>{group.status}</Text>
              </View>
            </Link>
            
          );
        })}
      </View>

      <View
        style={{
          width: 60,
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 10,
          right: 10
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