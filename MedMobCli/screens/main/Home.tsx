import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './rootStackParams';
import { MainBottomTabParamList } from './mainBottomTabParams';

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
}

export default HomeScreen;
