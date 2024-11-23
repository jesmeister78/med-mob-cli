/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { StrictMode, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Config from 'react-native-config';

console.warn('Direct access to ENV:', Config.ENV);
console.warn('Direct access to API:', Config.XRAI_API_HOST);

// Regular app code...

/*
  local imports
*/
import { Provider } from 'react-redux';
import { store } from './store';
import { RootStackParamList } from './screens/navigation/rootStackParams';
import AuthScreen from './screens/auth/Auth';
import MainScreen from './screens/main';
import { PaperProvider } from 'react-native-paper';
import ProcessedImageScreen from './screens/image/ProcessedImageScreen';
import ProcedureListScreen from './screens/main/ProcedureListScreen';
import ProcedureDetailsScreen from './screens/main/ProcedureDetailsScreen';
import showCameraContext from './context/showCameraContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [showCamera, setShowCamera] = useState(true);

  return (
    <StrictMode>
        <Provider store={store}>
          <PaperProvider>
            <showCameraContext.Provider value={{ showCamera, setShowCamera }}>
              <NavigationContainer>
                <Stack.Navigator >
                  <Stack.Screen name="Main" component={MainScreen} options={{ title: `xrAI mobile ${Config.ENV}` }} />
                  <Stack.Screen name="Auth" component={AuthScreen} />
                  <Stack.Screen name="ProcessedImage" component={ProcessedImageScreen} />
                  <Stack.Screen name="ProcedureDetails" component={ProcedureDetailsScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </showCameraContext.Provider>
          </PaperProvider>
        </Provider>
    </StrictMode>

  );
}

export default App;
