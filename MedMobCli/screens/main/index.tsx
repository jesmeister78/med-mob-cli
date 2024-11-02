import React, { useContext } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  MainBottomTabParamList,
  ProcedureScreenMode,
} from '../navigation/bottomTabParams';
import HomeScreen from './HomeScreen';
import CaptureScreen from './CaptureScreen';
import ProcedureListScreen from './ProcedureListScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import showCameraContext from '../../context/showCameraContext';
import ErrorComponent from '../../components/Error';
import { MD3Colors } from 'react-native-paper';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();
const tabBarOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: MD3Colors.tertiary70,
  headerShown: false,
};

function MainScreen() {
  const { setShowCamera } = useContext(showCameraContext);
  return (
    <>
      <ErrorComponent/>
      <BottomTab.Navigator screenOptions={tabBarOptions}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Capture"
          component={CaptureScreen}
          initialParams={{ showCamera: true, procedureId: undefined }}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              setShowCamera(true);
              navigation.navigate('Capture', {
                showCamera: true,
                procedureId: undefined,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="camera" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="ProcedureList"
          component={ProcedureListScreen}
          initialParams={{}}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('ProcedureList', {});
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>

  );
}

export default MainScreen;
