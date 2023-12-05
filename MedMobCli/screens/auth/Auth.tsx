import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/rootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreenNavProp } from '../navigation/screenNavProps';


function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavProp>();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Auth Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

export default AuthScreen;