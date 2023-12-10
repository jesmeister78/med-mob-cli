import {useNavigation} from '@react-navigation/native';
import { Button, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../navigation/rootStackParams';
import { MainBottomTabParamList } from '../navigation/bottomTabParams';
import { Containers } from '../../styles';

type HomeScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();

  return (
    <Surface 
      style={styles.surface}
    >
      <Button  onPress={() => navigation.navigate('Auth')} >Login</Button>
      <Button  onPress={() => navigation.navigate('Capture', {showCamera:true})} >Capture Image</Button>
      <Button  onPress={() => navigation.navigate('Procedure', {isCreateNew:true})} >Add New Case</Button>
      <Button  onPress={() => navigation.navigate('Procedure', {})} >View Case List</Button>
      <Button  onPress={() => navigation.navigate('ProcessedImage', {procedureId: '1'})} >Processed Image - Test</Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default HomeScreen;
