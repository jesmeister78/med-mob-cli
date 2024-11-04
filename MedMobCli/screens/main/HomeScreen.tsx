import { Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../navigation/rootStackParams';
import { MainBottomTabParamList } from '../navigation/bottomTabParams';
import { Containers } from '../../styles';
import MainMenuComponent from '../../components/MainMenu';

type HomeScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

function HomeScreen() {
  
  return (
    <Surface 
      style={styles.surface}
    >
      <MainMenuComponent />
      
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface, marginBottom:0 },
});

export default HomeScreen;
