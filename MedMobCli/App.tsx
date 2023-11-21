/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { } from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



/*
  local imports
*/
import HomeScreen from './screens/main/Home';
import CaptureImage from './screens/main/Capture';
import Case from './components/SurgeryList';
import { Provider } from 'react-redux';
import { store } from './store';
import Users from './components/Users';
import { RealmProvider } from './data/realmProvider';
import { RootStackParamList } from './screens/main/rootStackParams';
import AuthScreen from './screens/auth/Auth';
import MainScreen from './screens/main';

// export type ScreenNames = ["Home", "Capture", "Case", "Users"] // type these manually
// export type RootStackParamList = Record<ScreenNames[number], undefined>;
// export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {



  return (
    <RealmProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            {/* <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Capture" component={CaptureImage} />
            <Stack.Screen name="Case" component={Case} />
            <Stack.Screen name="Users" component={Users} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </RealmProvider>
  );
}


export default App;
