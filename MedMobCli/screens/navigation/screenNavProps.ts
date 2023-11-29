import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, CompositeScreenProps } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { MainBottomTabParamList } from "./bottomTabParams";
import { RootStackParamList } from "./rootStackParams";

export type CaptureScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Capture'>
>;

export type ProcedureScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Procedure'>
>;

export type PSNProps = CompositeScreenProps<
  StackScreenProps<MainBottomTabParamList, "Procedure">,
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, "Main">, 
    StackScreenProps<RootStackParamList>
  >
>

