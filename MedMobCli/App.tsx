/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { StrictMode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



/*
  local imports
*/
import { Provider } from 'react-redux';
import { store } from './store';
import { RealmProvider } from './data/realmProvider';
import { RootStackParamList } from './screens/navigation/rootStackParams';
import AuthScreen from './screens/auth/Auth';
import MainScreen from './screens/main';
import { PaperProvider } from 'react-native-paper';
import ProcessedImageScreen from './screens/image/ProcessedImageScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <StrictMode>
      <RealmProvider>
        <Provider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator >
                <Stack.Screen name="Main" component={MainScreen} options={{ title: "x-rAI mobile" }} />
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="ProcessedImage" component={ProcessedImageScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </RealmProvider>
    </StrictMode>

  );
}

export default App;
