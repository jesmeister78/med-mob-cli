import { useState } from "react";
import { View } from "react-native";
import { Button, Text, Card, Surface } from "react-native-paper";

import styles from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcedureById } from "../../store/procedures";
import { ProcedureProp } from "../props/procedureProps";
import ProcedureDetails from "./ProcedureDetails";
import AddImage from "./AddImageToProcedure";
import ProcedureCardCover from "./ProcedureCardCover";

function ProcedureSummary(props: ProcedureProp) {

    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    const [isExpanded, setIsExpanded] = useState(false);

    if (procedure) {
        if (isExpanded) {
            return (
                <Card key={procedure.id}>
                    <ProcedureDetails id={props.id} />
                    <Button
                        onPress={() => setIsExpanded(!isExpanded)}>Collapse</Button>
                </Card>
            );
        } else {
            return (
                <Card key={procedure.id} style={styles.procedureSummaryCard}
                    elevation={2}
                >
                    <Card.Title
                        title={"Case#: " + procedure.caseNumber}
                    />
                   <ProcedureCardCover procedureId={procedure.id} addImageSource={props.addImageSource} />
                    <Card.Content>
                        <Text>
                            Patient: {procedure.patientName} Surgeon: {procedure.surgeon} Date: {procedure.date}
                        </Text>
                    </Card.Content>

                    <Card.Actions>
                        <AddImage procedureId={procedure.id} addImageSource={props.addImageSource} />
                        <Button
                            mode="contained"
                            onPress={() => setIsExpanded(!isExpanded)}>Edit</Button>
                    </Card.Actions>

                </Card>
            );
        }
    }
    else return (
        <Surface style={styles.outerSurface}><Text>Procedure not found.</Text></Surface>

    );
}

export default ProcedureSummary;