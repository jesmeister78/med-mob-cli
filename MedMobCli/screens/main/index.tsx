import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from './MainBottomTabParams';
import HomeScreen from './Home';
import CaptureScreen from './Capture';
import ProcedureScreen from './Procedure';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

function MainScreen() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Capture" component={CaptureScreen} />
      <BottomTab.Screen name="Procedure" component={ProcedureScreen} />
    </BottomTab.Navigator>
  );
}

export default MainScreen;