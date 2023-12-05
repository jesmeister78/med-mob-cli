import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/rootStackParams';
import { MainBottomTabParamList, ProcedureScreenMode } from '../navigation/bottomTabParams';
import { Button, Surface, Text } from 'react-native-paper';

type HomeScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();

  return (
    <Surface 
      elevation={2}
    >
      <Text variant='titleSmall'>HOME</Text>
      <Button  onPress={() => navigation.navigate('Auth')} >Login</Button>
      <Button  onPress={() => navigation.navigate('Capture', {})} >Capture Image</Button>
      <Button  onPress={() => navigation.navigate('Procedure', {isCreateNew:true})} >Add New Case</Button>
      <Button  onPress={() => navigation.navigate('Procedure', {})} >View Case List</Button>
      <Button  onPress={() => navigation.navigate('ProcessedImage', {procedureId: '1'})} >Processed Image - Test</Button>
    </Surface>
  );
}

export default HomeScreen;
