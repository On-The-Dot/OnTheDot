import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Button, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase_setup";

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  timezone: string;
}

export default function Settings() {
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
      // Optionally, navigate to the login screen after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <View style={styles.content}>
        {userInfo ? (
          <>
            <Text style={styles.infoText}>First Name: {userInfo.first_name}</Text>
            <Text style={styles.infoText}>Last Name: {userInfo.last_name}</Text>
            <Text style={styles.infoText}>Email: {userInfo.email}</Text>
            <Text style={styles.infoText}>School: {userInfo.school}</Text>
            <Text style={styles.infoText}>Time Zone: {userInfo.timezone}</Text>
            <Button title="Log Out" onPress={handleLogout} />
          </>
        ) : (
          <Text>Loading user information...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(215,192,174,0.40)',
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
