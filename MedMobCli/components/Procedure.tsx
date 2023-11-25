import { Text, View } from "react-native";
import styles from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { procedureUpdated, selectProcedureById } from "../store/procedures";
import { Surface, TextInput } from "react-native-paper";
import { ProcedureProp } from "./props/procedureProps";
import AddImage from "./AddImageToProcedure";
import React from "react";


function Procedure(props: ProcedureProp) {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    if (procedure) {
        return (
            <Surface key={procedure.id}>
                <TextInput
                    label="Case Number:"
                    value={procedure.id}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { caseNumber: +text } }))}
                />
                <TextInput
                    label="UR Identifier:"
                    value={procedure.urIdentifier}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { urIdentifier: text } }))}
                />
                <TextInput
                    label="Patient Name:"
                    value={procedure.patientName}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { patientName: text } }))}
                />
                <TextInput
                    label="Procedure Date:"
                    value={procedure.date}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { date: text } }))} />
                <TextInput
                    label="Surgeon Name:"
                    value={procedure.surgeon}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { surgeon: text } }))} />
                <TextInput
                    label="Surgery Type:"
                    value={procedure.surgeryType}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { surgeryType: text } }))} />
                <TextInput
                    label="Hospital:"
                    value={procedure.hospital}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { hospital: text } }))} />
                <TextInput
                    label="Indication:"
                    value={procedure.indication}
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { indication: text } }))} />
                <AddImage procedureId={procedure.id} />

            </Surface>

        );
    }
    else return (
        <View style={styles.container} >
            <Text>
                Procedure Not Found
            </Text>

        </View>
    );
}

export default Procedure;