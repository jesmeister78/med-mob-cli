import { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import ProcedureDetails from "../../components/procedure/ProcedureDetails";
import { useAppDispatch } from "../../hooks";
import createNewProcedure from "../../store/createNewProcedure";
import { procedureAdded } from "../../store/procedures";
import { Containers } from "../../styles";
import { ProcedureDetailsScreenRouteProp } from "../navigation/screenNavProps";



function ProcedureDetailsScreen({route}: ProcedureDetailsScreenRouteProp) {

    // const dispatch = useAppDispatch();
    // const newProcedure = createNewProcedure(3);
    // useEffect(() => { dispatch(procedureAdded(newProcedure!)) }, []);

    return (
        <SafeAreaView >
            <ScrollView>
                <Surface
                    style={styles.surface}
                >
                    <ProcedureDetails procedureId={route.params.procedureId} />

                </Surface>
            </ScrollView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
  });
  
export default ProcedureDetailsScreen;