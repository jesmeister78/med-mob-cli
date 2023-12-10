import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Card, Surface, IconButton } from "react-native-paper";

import { Cards, Containers } from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcedureById } from "../../store/procedures";
import { ProcedureProp } from "../props/procedureProps";
import AddImageToProcedure from "./AddImageToProcedure";
import ProcedureCardCover from "./ProcedureCardCover";
import SendImageToRobot from "../image/ProcessImage";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import { useNavigation } from "@react-navigation/native";
import { ProcedureScreenNavProp } from "../../screens/navigation/screenNavProps";

function ProcedureSummary(props: ProcedureProp) {

    const navigation = useNavigation<ProcedureScreenNavProp>();
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    const images = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.id));
    const [isExpanded, setIsExpanded] = useState(false);

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
                    <Text>
                        Patient: {procedure.patientName} Surgeon: {procedure.surgeon} Date: {procedure.date}
                    </Text>
                </Card.Content>

                <Card.Actions>
                    <SendImageToRobot img={images[0]} />
                    <AddImageToProcedure procedureId={procedure.id} addImageSource={props.addImageSource} />
                    <IconButton
                        icon={"pencil"}
                        mode="contained"
                        onPress={() => navigation.navigate("Procedure", { procedureId: procedure.id })} />
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
    card: { ...Cards.cards.procedureSummary }
});

export default ProcedureSummary;