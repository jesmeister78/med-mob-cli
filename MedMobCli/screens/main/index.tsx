import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainBottomTabParamList } from '../navigation/mainBottomTabParams';
import HomeScreen from './Home';
import CaptureScreen from './Capture';
import ProcedureScreen from './Procedure';
import { CustomTabBar } from '../navigation/CustomTabBar';

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
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Procedure"
        component={ProcedureScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
    // <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    //   <BottomTab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialIcons name="home" color={color} size={size} />
    //       ),
    //     }} />
    //   <BottomTab.Screen name="Capture" component={CaptureScreen}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialIcons name="camera" color={color} size={size} />
    //       ),
    //     }} />
    //   <BottomTab.Screen name="Procedure" component={ProcedureScreen}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialIcons name="document" color={color} size={size} />
    //       ),
    //     }} />
    // </BottomTab.Navigator>
  );
}

export default MainScreen;