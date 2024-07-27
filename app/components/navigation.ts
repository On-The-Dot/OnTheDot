import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Tabs: undefined;     // No parameters for this screen
    AddTask: undefined;  // No parameters for this screen
};

export type AddTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTask'
>;