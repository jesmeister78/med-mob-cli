import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProcedureList from '../../components/procedure/ProcedureList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from 'react-native-paper';
import { ProcedureScreenRouteProp } from '../navigation/screenNavProps';
import { Containers } from '../../styles';

export type ProcedureScreenProp = {
  attachMode?: boolean
}

const ProcedureListScreen = ({ route, navigation }: ProcedureScreenRouteProp) => {
  // const navigation = useNavigation<ProcedureScreenProp>();
  const imageSource = route.params?.imageId;
  console.log("ProcedureScreen::route.params?.imageSource: " + imageSource)

  return (
    <Surface
      style={styles.surface}
    >
      <ProcedureList imageId={imageSource} />

    </Surface>

  )
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default ProcedureListScreen;
