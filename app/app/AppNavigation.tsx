import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./(tabs)/_layout"; 
import AddTaskScreen from "../components/AddTaskScreen"; 
import { RootStackParamList } from "../components/navigation"; 

const Stack = createStackNavigator();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
