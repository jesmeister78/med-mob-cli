import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/rootStackParams';
import { MainBottomTabParamList } from '../navigation/mainBottomTabParams';

type ProcedureScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Procedure'>
>;

function ProcedureScreen() {
  const navigation = useNavigation<ProcedureScreenProp>();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
}

export default ProcedureScreen;
