import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import ProcedureList from '../../components/ProcedureList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { PSNProps, ProcedureScreenNavProp } from '../navigation/screenNavProps';
import { ProcedureScreenMode } from '../navigation/bottomTabParams';
import ProcedureDetails from '../../components/ProcedureDetails';
import { useAppDispatch } from '../../hooks';
import { Procedure } from '../../domain/procedure';
import { procedureAdded } from '../../store/procedures';

export type ProcedureScreenProp = {
  attachMode?: boolean
}

const ProcedureScreen = ({ route, navigation }: PSNProps) => {
  // const navigation = useNavigation<ProcedureScreenProp>();
  const imageSource = route.params?.imageSource;

  // default mode is LIST when we get here from the bottom tab nav
  const mode = route.params?.mode ?? ProcedureScreenMode.LIST;

  console.log("ProcedureScreen::route.params?.imageSource: " + imageSource ?? 'no image source in route params')

  // if mode is ADD then we need to add a new procedure to the store before we can render it
  if (mode === ProcedureScreenMode.ADD) {
    const dispatch = useAppDispatch();
    const newProcedure = {
      id: uuidv4(),
      caseNumber: 3,
      patientName: '',
      urIdentifier: '',
      date: '2023-11-30',
      hospital: '',
      surgeon: '',

      /*
          laparoscopic cholecystectomy; 
          open cholecystectomy; 
          other (free text) 
      */
      surgeryType: '',

      /*
          Routine
          Suspected choledocholithiasis
          Deranged LFTs
          Pancreatitis
          Other (free text)
      */
      indication: ''
    } as Procedure

    useEffect(() => {dispatch(procedureAdded(newProcedure))}, [])
    

    return (
      <Surface
      elevation={2}
    >
      <Text variant='titleSmall'>ADD NEW CASE</Text>

      <SafeAreaView >
        <ScrollView>
          <ProcedureDetails id={newProcedure.id}  />

        </ScrollView>
      </SafeAreaView>

    </Surface>
    )
  }

  return  (
    <Surface
      elevation={2}
    >
      <Text variant='titleSmall'>CASES</Text>

      <SafeAreaView >
        <ScrollView>
          <ProcedureList imageSource={imageSource} />

        </ScrollView>
      </SafeAreaView>

    </Surface>
  ) 
}

export default ProcedureScreen;
