import { ScrollView, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import ProcedureDetails from "../../components/procedure/ProcedureDetails";
import { Containers } from "../../styles";
import { ProcedureDetailsScreenRouteProp } from "../navigation/screenNavProps";
import ErrorComponent from "../../components/Error";



function ProcedureDetailsScreen({route}: ProcedureDetailsScreenRouteProp) {

    return (
            <ScrollView>
                <Surface
                    style={styles.surface}
                >
                    <Text variant="titleMedium" >Tap a raw image to send it to the xrAI engine</Text>

                    <ProcedureDetails procedureId={route.params.procedureId} />

                </Surface>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
  });
  
export default ProcedureDetailsScreen;