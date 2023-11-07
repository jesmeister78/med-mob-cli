/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';

/*
  local imports
*/
import styles from './styles';
import HomeScreen from './components/HomeScreen';
import CaptureImage from './components/CaptureImage';
import Case from './components/Case';
import { Provider } from 'react-redux';
import { store } from './store';

export type ScreenNames = ["Home", "Capture", "Case"] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  // setup navigation


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Capture" component={CaptureImage} />
          <Stack.Screen name="Case" component={Case} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
