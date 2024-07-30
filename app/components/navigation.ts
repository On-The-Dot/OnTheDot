import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Tabs: undefined;     // No parameters for this screen
    AddTask: undefined;  // No parameters for this screen
    Register: undefined;
    Login: undefined;
};

export type AddTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTask'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;