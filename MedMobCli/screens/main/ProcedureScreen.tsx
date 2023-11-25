import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/rootStackParams';
import { MainBottomTabParamList } from '../navigation/mainBottomTabParams';
import Procedure from '../../components/Procedure';
import ProcedureList from '../../components/ProcedureList';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProcedureScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Procedure'>
>;

function ProcedureScreen() {
  const navigation = useNavigation<ProcedureScreenProp>();

  return (
    <SafeAreaView >
      <ScrollView>
      <ProcedureList/>

      </ScrollView>
    </SafeAreaView>
  );
}

export default ProcedureScreen;
