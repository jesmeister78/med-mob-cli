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
export type ProcedureListScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'ProcedureList'>
>;

export type ProcedureScreenRouteProp = CompositeScreenProps<
  StackScreenProps<MainBottomTabParamList, "ProcedureList">,
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, "Main">, 
    StackScreenProps<RootStackParamList>
  >
>

export type AuthScreenNavProp = StackNavigationProp<RootStackParamList, 'Auth'>;
export type ProcessedImageScreenNavProp = StackNavigationProp<RootStackParamList, 'ProcessedImage'>;
export type ProcessedImageScreenRouteProp = StackScreenProps<RootStackParamList, 'ProcessedImage'>;
export type ProcedureDetailsScreenNavProp = StackNavigationProp<RootStackParamList, 'ProcedureDetails'>;
export type ProcedureDetailsScreenRouteProp = StackScreenProps<RootStackParamList, 'ProcedureDetails'>;

