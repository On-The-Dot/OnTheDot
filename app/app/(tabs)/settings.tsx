import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase_setup";
import { useNavigation } from "@react-navigation/native";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
}

export default function Settings() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as UserInfo);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
        navigation.navigate('LoginScreen' as never);
  
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {userInfo ? (
          <>
            <Text style={styles.header}>User Information</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>First Name:</Text>
              <Text style={styles.infoText}>{userInfo.firstName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Last Name:</Text>
              <Text style={styles.infoText}>{userInfo.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>School:</Text>
              <Text style={styles.infoText}>{userInfo.school}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading user information...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
