import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabLayout from "./(tabs)/_layout"; 
import AddTaskScreen from "../components/AddTaskScreen"; 
import { RootStackParamList } from "../components/navigation"; 

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
