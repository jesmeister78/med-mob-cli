import { StyleSheet, View } from "react-native";
import { Text, Card, Surface, IconButton } from "react-native-paper";

import { Cards, Containers } from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcedureById } from "../../store/procedureSlice";
import { ProcedureProp } from "../props/procedureProps";
import AddImageToProcedure from "./AddImageToProcedure";
import ProcedureCardCover from "./ProcedureCardCover";
import { useNavigation } from "@react-navigation/native";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";

function ProcedureSummary(props: ProcedureProp) {

    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.procedureId));

    if (procedure) {

        return (
            <Card key={procedure.id}
                style={styles.card}
            >
                <Card.Title
                    title={"Case#: " + procedure.caseNumber}
                />
                <ProcedureCardCover procedureId={procedure.id} />
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text variant="labelSmall">
                                Patient:
                            </Text>
                            <Text variant="bodySmall">
                                {procedure.patientName}
                            </Text>
                        </View>
                        <View style={styles.cell}>
                            <Text variant="labelSmall">
                                Surgeon:
                            </Text>
                            <Text variant="bodySmall">
                                {procedure.surgeon}
                            </Text>

                        </View>
                        <View style={styles.cell}>
                            <Text variant="labelSmall">
                                Date:
                            </Text>
                            <Text variant="bodySmall">
                                {new Date(procedure.date).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                </Card.Content>

                <Card.Actions>
                    
                    <AddImageToProcedure procedureId={procedure.id} addImageId={props.addImageId} />
                    <IconButton
                        icon={"pencil"}
                        mode="contained"
                        onPress={() => navigation.navigate("ProcedureDetails", { procedureId: procedure.id })} />
                </Card.Actions>

            </Card>
        );
    }
    else return (
        <Surface style={styles.surface}><Text>Procedure not found.</Text></Surface>

    );
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    row: { ...Containers.container.row },
    cell: { ...Containers.container.cell },
    card: { ...Cards.cards.procedureSummary },
});

export default ProcedureSummary;