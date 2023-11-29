import { useState } from "react";
import { View } from "react-native";
import { Button, Text, Card } from "react-native-paper";

import styles from "../styles";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { selectProcedureById } from "../store/procedures";
import { ProcedureProp } from "./props/procedureProps";
import ProcedureDetails from "./ProcedureDetails";
import AddImage from "./AddImageToProcedure";
import ProcedureImage from "./ProcedureImage";

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
                <Card key={procedure.id}
                    elevation={2}
                >
                    <Card.Title
                        title={"Case#: " + procedure.caseNumber}
                    />
                   <ProcedureImage imageSource={props.imageSource} />
                    <Card.Content>
                        <Text>
                            Patient: {procedure.patientName} Surgeon: {procedure.surgeon} Date: {procedure.date}
                        </Text>
                    </Card.Content>

                    <Card.Actions>
                        <AddImage procedureId={procedure.id} />
                        <Button
                            mode="contained"
                            onPress={() => setIsExpanded(!isExpanded)}>Edit</Button>
                    </Card.Actions>

                </Card>
            );
        }
    }
    else return (
        <View style={styles.container} >
            <Text>
                Procedure Not Found
            </Text>

        </View>
    );
}

export default ProcedureSummary;