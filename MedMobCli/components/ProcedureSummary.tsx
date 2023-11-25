import { View } from "react-native";
import styles from "../styles";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { selectProcedureById } from "../store/procedures";
import { ProcedureProp } from "./props/procedureProps";
import { Button, Text, Card } from "react-native-paper";
import Procedure from "./Procedure";
import { useState } from "react";
import AddImage from "./AddImageToProcedure";
import * as React from 'react';
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

function ProcedureSummary(props: ProcedureProp) {

    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    const [isExpanded, setIsExpanded] = useState(false);

    if (procedure) {
        if (isExpanded) {
            return (
                <Card key={procedure.id}>
                    <Procedure key={procedure.id} id={props.id} />
                    <Button
                        onPress={() => setIsExpanded(!isExpanded)}>Collapse</Button>
                </Card>
            );
        } else {
            return (
                <Card key={procedure.id}>
                    <Card.Title
                        title={procedure.patientName}
                    >
                        <Text>
                            Patient: {procedure.patientName} Date: {procedure.date}
                        </Text>
                    </Card.Title>
                    <Card.Content>
                        <Text>
                            Case#: {procedure.caseNumber} Patient: {procedure.patientName} Date: {procedure.date}
                        </Text>
                    </Card.Content>

                    <AddImage procedureId={procedure.id} />
                    <Card.Actions>
                        <Button
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