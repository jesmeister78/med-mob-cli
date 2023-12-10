import { StyleSheet, Text, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { procedureUpdated, selectProcedureById } from "../../store/procedures";
import { ProcedureProp } from "../props/procedureProps";
import AddImageToProcedure from "./AddImageToProcedure";
import { indications } from "../../domain/constants/indications";
import { surgeryTypes } from "../../domain/constants/surgeryTypes";
import { selectRawImagesByProcedureId } from "../../store/rawImages";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import ProcedureImages from "./ProcedureImages";
import { SafeAreaView } from "react-native-safe-area-context";
import { Containers, Images, Inputs } from "../../styles";


function ProcedureDetails(props: ProcedureProp) {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.id));
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.id));
    const [showSurgeryTypesDropDown, setShowSurgeryTypesDropDown] = useState(false);
    const [showIndicationsMultiselect, setShowIndicationsMultiselect] = useState(false);
    if (procedure) {
        return (
            <SafeAreaView>
                <Surface key={procedure.id}
                    style={styles.surface}
                >
                    <View style={styles.imgThumbnail}>
                        <ProcedureImages procedureImages={processedImages} />
                    </View>
                    <View style={styles.spacer} />
                    <TextInput
                        style={styles.procTextInput}
                        label="Case Number"
                        value={procedure.id}
                        mode="outlined"
                        onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { caseNumber: +text } }))}
                    />
                    <View style={styles.spacer} />
                    <TextInput
                        style={styles.procTextInput}
                        label="UR Identifier"
                        value={procedure.urIdentifier}
                        mode="outlined"
                        onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { urIdentifier: text } }))}
                    />
                    <View style={styles.spacer} />
                    <TextInput
                        style={styles.procTextInput}
                        label="Patient Name"
                        value={procedure.patientName}
                        mode="outlined"
                        onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { patientName: text } }))}
                    />
                    {/* <View style={styles.spacer} /> */}
                    <DatePickerInput
                        style={styles.procDateInput}
                        locale="en-GB"
                        label="Procedure Date"
                        value={new Date(procedure.date)}
                        onChange={d => dispatch(procedureUpdated({ id: props.id, changes: { date: d?.toISOString() } }))}
                        inputMode="start"
                        mode="outlined"
                    />
                    {/* <View style={styles.spacer} /> */}
                    <TextInput
                        style={styles.procTextInput}
                        label="Surgeon Name"
                        value={procedure.surgeon}
                        mode="outlined"
                        onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { surgeon: text } }))} />
                    <View style={styles.spacer} />
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
                    <View style={styles.spacer} />
                    <TextInput
                        style={styles.procTextInput}
                        label="Hospital"
                        value={procedure.hospital}
                        mode="outlined"
                        onChangeText={text => dispatch(procedureUpdated({ id: props.id, changes: { hospital: text } }))} />
                    <View style={styles.spacer} />

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
                    <View style={styles.spacer} />
                    <AddImageToProcedure procedureId={procedure.id} />

                </Surface>
            </SafeAreaView>


        );
    }
    else return (
        <Surface style={styles.surface}><Text>Procedure not found.</Text></Surface>

    );
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    spacer: { ...Containers.container.spacer },
    procTextInput: { ...Inputs.procedure.text },
    procDateInput: { ...Inputs.procedure.datePicker },
    imgThumbnail: { ...Images.images.thumbnail }
});

export default ProcedureDetails;