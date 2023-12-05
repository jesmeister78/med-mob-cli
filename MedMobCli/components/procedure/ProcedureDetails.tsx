import { Text, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import styles from "../../styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { procedureUpdated, selectProcedureById } from "../../store/procedures";
import { ProcedureProp } from "../props/procedureProps";
import AddImage from "./AddImageToProcedure";
import { indications } from "../../domain/constants/indications";
import { surgeryTypes } from "../../domain/constants/surgeryTypes";
import { selectRawImagesByProcedureId } from "../../store/rawImages";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import ProcedureImages from "./ProcedureImages";


function ProcedureDetails(props: ProcedureProp) {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.id));
    const [showSurgeryTypesDropDown, setShowSurgeryTypesDropDown] = useState(false);
    const [showIndicationsMultiselect, setShowIndicationsMultiselect] = useState(false);
    if (procedure) {
        return (
            <Surface key={procedure.id} style={styles.outerSurface}>
                <ProcedureImages procedureImages={processedImages} />
                <View style={styles.spacerStyle} />
                <TextInput
                    style={styles.procInput}
                    label="Case Number"
                    value={procedure.id}
                    mode="outlined"
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { caseNumber: +text } }))}
                />
                <View style={styles.spacerStyle} />
                <TextInput
                    style={styles.procInput}
                    label="UR Identifier"
                    value={procedure.urIdentifier}
                    mode="outlined"
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { urIdentifier: text } }))}
                />
                <View style={styles.spacerStyle} />
                <TextInput
                    style={styles.procInput}
                    label="Patient Name"
                    value={procedure.patientName}
                    mode="outlined"
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { patientName: text } }))}
                />
                <View style={styles.spacerStyle} />
                <DatePickerInput
                    style={styles.procInput}
                    locale="en-GB"
                    label="Procedure Date"
                    value={new Date(procedure.date)}
                    onChange={d => dispatch(procedureUpdated({ id: props.id, changes: { date: d?.toISOString() } }))}
                    inputMode="start"
                    mode="outlined"
                />
                <View style={styles.spacerStyle} />
                <TextInput
                    style={styles.procInput}
                    label="Surgeon Name"
                    value={procedure.surgeon}
                    mode="outlined"
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { surgeon: text } }))} />
                <View style={styles.spacerStyle} />
                <DropDown
                    label={"Surgery Type"}
                    mode={"outlined"}
                    visible={showSurgeryTypesDropDown}
                    showDropDown={() => setShowSurgeryTypesDropDown(true)}
                    onDismiss={() => setShowSurgeryTypesDropDown(false)}
                    value={procedure.surgeryType}
                    setValue={val => dispatch(procedureUpdated({ id: props.id, changes: { surgeryType: val } }))}
                    list={surgeryTypes}
                />
                <View style={styles.spacerStyle} />
                <TextInput
                    style={styles.procInput}
                    label="Hospital"
                    value={procedure.hospital}
                    mode="outlined"
                    onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { hospital: text } }))} />
                <View style={styles.spacerStyle} />

                <DropDown
                    label={"Indications"}
                    mode={"outlined"}
                    visible={showIndicationsMultiselect}
                    showDropDown={() => setShowIndicationsMultiselect(true)}
                    onDismiss={() => setShowIndicationsMultiselect(false)}
                    value={procedure.indication}
                    setValue={val => dispatch(procedureUpdated({ id: props.id, changes: { indication: val } }))}
                    list={indications}
                    multiSelect
                />
                <View style={styles.spacerStyle} />
                <AddImage procedureId={procedure.id} />

            </Surface>

        );
    }
    else return (
        <Surface style={styles.outerSurface}><Text>Procedure not found.</Text></Surface>

    );
}

export default ProcedureDetails;