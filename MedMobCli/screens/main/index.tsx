import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainBottomTabParamList, ProcedureScreenMode } from '../navigation/bottomTabParams';
import HomeScreen from './HomeScreen';
import CaptureScreen from './CaptureScreen';
import ProcedureListScreen from './ProcedureListScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();
const tabBarOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#9381ff',
  headerShown: false
};

function MainScreen() {
  return (
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
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Capture', { showCamera: true, procedureId: undefined });
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
          tabPress: (e) => {
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
  );
}

export default MainScreen;