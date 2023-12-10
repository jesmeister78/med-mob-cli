import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProcedureList from '../../components/procedure/ProcedureList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from 'react-native-paper';
import { ProcedureScreenRouteProp } from '../navigation/screenNavProps';
import { ProcedureScreenMode } from '../navigation/bottomTabParams';
import ProcedureDetails from '../../components/procedure/ProcedureDetails';
import { useAppDispatch } from '../../hooks';
import { Procedure } from '../../domain/procedure';
import { procedureAdded } from '../../store/procedures';
import { Containers } from '../../styles';
import createNewProcedure from '../../store/createNewProcedure';

export type ProcedureScreenProp = {
  attachMode?: boolean
}

const ProcedureScreen = ({ route, navigation }: ProcedureScreenRouteProp) => {
  // const navigation = useNavigation<ProcedureScreenProp>();
  const imageSource = route.params?.imageSource;
  console.log("ProcedureScreen::route.params?.imageSource: " + imageSource ?? 'no image source in route params')

  // default mode is LIST when we get here from the bottom tab nav
  const mode =
    route.params?.imageSource ?
      (
        route.params.procedureId ?
          ProcedureScreenMode.EDIT : route.params.isCreateNew ?
            ProcedureScreenMode.ADD : ProcedureScreenMode.LIST
      ) : (
        route.params?.isCreateNew ?
          ProcedureScreenMode.ADD : route.params.procedureId ?
            ProcedureScreenMode.EDIT : ProcedureScreenMode.LIST
      );

  const title = mode === ProcedureScreenMode.ADD ? "ADD NEW CASE" : mode === ProcedureScreenMode.EDIT ? "EDIT CASE" : "CASES";


  // if mode is ADD then we need to add a new procedure to the store before we can render it
  //if (mode === ProcedureScreenMode.ADD) {
  const dispatch = useAppDispatch();
  let newProcedure: Procedure | null = null;  // TODO: need to work out how to assign case numbers
  let procedureId: string | undefined = route.params.procedureId;
  if (mode === ProcedureScreenMode.ADD) {
    newProcedure = createNewProcedure(3);
    procedureId = newProcedure.id;
    useEffect(() => { dispatch(procedureAdded(newProcedure!)) }, []);
  }

  return (
    <SafeAreaView >
      <ScrollView>
        <Surface
          style={styles.surface}
        >
          {
            mode === ProcedureScreenMode.LIST ?
              (
                <ProcedureList addImageSource={imageSource} />
              ) : (
                <ProcedureDetails id={procedureId!} />
              )
          }

        </Surface>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default ProcedureScreen;
