import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, CompositeScreenProps } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { MainBottomTabParamList } from "./bottomTabParams";
import { RootStackParamList } from "./rootStackParams";

export type CaptureScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Capture'>
>;

export type CaptureScreenRouteProp = CompositeScreenProps<
  StackScreenProps<MainBottomTabParamList, "Capture">,
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, "Main">, 
    StackScreenProps<RootStackParamList>
  >
>
export type ProcedureScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Procedure'>
>;

export type ProcedureScreenRouteProp = CompositeScreenProps<
  StackScreenProps<MainBottomTabParamList, "Procedure">,
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, "Main">, 
    StackScreenProps<RootStackParamList>
  >
>

export type AuthScreenNavProp = StackNavigationProp<RootStackParamList, 'Auth'>;
export type ProcessedImageScreenNavProp = StackNavigationProp<RootStackParamList, 'ProcessedImage'>;
export type ProcessedImageScreenRouteProp = StackScreenProps<RootStackParamList, 'ProcessedImage'>;

