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
import { NavigationContainer } from '@react-navigation/native';
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

function App() {

  // setup navigation

  const Stack = createNativeStackNavigator();
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Capture" component={CaptureImage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
