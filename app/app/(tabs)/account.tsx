import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase_setup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
}

export default function AccountPage() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const user = getAuth().currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserInfo;
            setUserInfo(userData);
            await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
          }
        } else {
          await AsyncStorage.removeItem('currentUser');
          navigation.navigate('LoginScreen' as never); // Navigate to login if not logged in
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
        Alert.alert("Error", "Failed to load user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserInfo;
          setUserInfo(userData);
          await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
        }
      } else {
        setUserInfo(null);
        await AsyncStorage.removeItem('currentUser');
        navigation.navigate('LoginScreen' as never); 
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null); // Clear user info
      await AsyncStorage.removeItem('currentUser');
      navigation.navigate('LoginScreen' as never);
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/OnTheDot logo.png")} 
          style={styles.logo}
        />
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
          <>
            <Text style={styles.header}>You are not logged in</Text>
            <Text style={styles.infoText}>Would you like to log in or create an account?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create an Account</Text>
            </TouchableOpacity>
          </>
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
    alignItems: "flex-start",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
    width: "100%",
  },
  infoContainer: {
    marginBottom: 15,
    width: "100%",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
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
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
