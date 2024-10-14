import { StyleSheet, Text, View } from "react-native";
import { Divider, Surface, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { procedureUpdated, selectProcedureById, updateProcedure } from "../../store/procedures";
import AddImageToProcedure from "./AddImageToProcedure";
import { indications } from "../../domain/constants/indications";
import { surgeryTypes } from "../../domain/constants/surgeryTypes";
import ProcedureImages from "./ProcedureImages";
import { Containers, Images, Inputs } from "../../styles";
import ErrorComponent from "../Error";
import { procedureService } from "../../services/procedureService";

type ProcedureDetailsProp = {
    procedureId: string
    addImageId?: string
}

function ProcedureDetails(props: ProcedureDetailsProp) {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.procedureId));
    const [showSurgeryTypesDropDown, setShowSurgeryTypesDropDown] = useState(false);
    const [showIndicationsMultiselect, setShowIndicationsMultiselect] = useState(false);
    if (procedure) {
        return (
            <Surface key={procedure.id}
                style={styles.surface}
            >
                <ErrorComponent />
                <View style={styles.spacer} />
                <View style={styles.imgThumbnail}>
                    <ProcedureImages procedureId={procedure.id} />
                </View>
                <View style={styles.spacer} />
                <Divider style={styles.divider} />

                <View style={styles.spacer} />
                <TextInput
                    style={styles.procTextInput}
                    label="Case Number"
                    value={procedure.caseNumber.toString()}
                    mode="outlined"
                    onChangeText={text => {
                        dispatch(procedureUpdated({ id: props.procedureId, changes: { caseNumber: +text } }));
                        procedureService.updateProcedureAsync({ id: props.procedureId, changes: { caseNumber: +text } })
                    }}
                />
                <View style={styles.spacer} />
                <TextInput
                    style={styles.procTextInput}
                    label="UR Identifier"
                    value={procedure.urIdentifier}
                    mode="outlined"
                    // onChangeText={text => {
                    //     // dispatch(updateProcedure({procId: props.procedureId, update: { id: props.procedureId, changes: { urIdentifier: text } }}));
                    //     dispatch(procedureUpdated({ id: props.procedureId, changes: { urIdentifier: text } }));
                    //     procedureService.updateProcedureAsync({ id: props.procedureId, changes: { urIdentifier: text } })
                    // }}
                />
                <View style={styles.spacer} />
                <TextInput
                    style={styles.procTextInput}
                    label="Patient Name"
                    value={procedure.patientName}
                    mode="outlined"
                    onChangeText={

                        text => {
                            dispatch(procedureUpdated({ id: props.procedureId, changes: { patientName: text } }));
                            procedureService.updateProcedureAsync({ id: props.procedureId, changes: { patientName: text } })
                        }}
                />
                <View style={styles.spacer} />
                <DatePickerInput
                    style={styles.procDateInput}
                    locale="en-GB"
                    label="Procedure Date"
                    value={new Date(procedure.date)}
                    onChange={d => {
                        dispatch(procedureUpdated({ id: props.procedureId, changes: { date: d?.toISOString() } }))
                        procedureService.updateProcedureAsync({ id: props.procedureId, changes: { date: d?.toISOString() } })
                    }}
                    inputMode="start"
                    mode="outlined"
                />
                <View style={styles.spacer} />
                <TextInput
                    style={styles.procTextInput}
                    label="Surgeon Name"
                    value={procedure.surgeon}
                    mode="outlined"
                    onChangeText={
                        text => {
                            dispatch(procedureUpdated({ id: props.procedureId, changes: { surgeon: text } }));
                            procedureService.updateProcedureAsync({ id: props.procedureId, changes: { surgeon: text } })
                        }} />
                <View style={styles.spacer} />
                <DropDown
                    label={"Surgery Type"}
                    mode={"outlined"}
                    visible={showSurgeryTypesDropDown}
                    showDropDown={() => setShowSurgeryTypesDropDown(true)}
                    onDismiss={() => setShowSurgeryTypesDropDown(false)}
                    value={procedure.surgeryType}
                    setValue={val => {
                        dispatch(procedureUpdated({ id: props.procedureId, changes: { surgeryType: val } }))
                        procedureService.updateProcedureAsync({ id: props.procedureId, changes: { surgeryType: val } })
                    }}
                    list={surgeryTypes}
                />
                <View style={styles.spacer} />
                <TextInput
                    style={styles.procTextInput}
                    label="Hospital"
                    value={procedure.hospital}
                    mode="outlined"
                    onChangeText={
                        text => {
                            dispatch(procedureUpdated({ id: props.procedureId, changes: { hospital: text } }))
                            procedureService.updateProcedureAsync({ id: props.procedureId, changes: { hospital: text } })
                        }}
                />
                <View style={styles.spacer} />

                <DropDown
                    label={"Indications"}
                    mode={"outlined"}
                    visible={showIndicationsMultiselect}
                    showDropDown={() => setShowIndicationsMultiselect(true)}
                    onDismiss={() => setShowIndicationsMultiselect(false)}
                    value={procedure.indication}
                    setValue={val => dispatch(procedureUpdated({ id: props.procedureId, changes: { indication: val } }))}
                    list={indications}
                    multiSelect
                />
                <View style={styles.spacer} />
                <Divider style={styles.divider} />
                <View style={styles.spacer} />
                <AddImageToProcedure procedureId={procedure.id} />

            </Surface>


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
    imgThumbnail: { ...Images.images.thumbnail },
    divider: { ...Containers.container.divider },

});

export default ProcedureDetails;