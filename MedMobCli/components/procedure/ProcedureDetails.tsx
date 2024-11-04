import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Surface, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { procedureUpdated, selectProcedureById, updateProcedure } from "../../store/procedureSlice";
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
                <Text variant="titleMedium" >Tap on an image to send it to the xrAI engine</Text>
                <Divider style={styles.divider} />
                <ScrollView
                    horizontal={true}
                >
                    <ProcedureImages procedureId={procedure.id} />
                </ScrollView>
                <Divider style={styles.divider} />
                <ScrollView>
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
                    <TextInput
                        style={styles.procTextInput}
                        label="UR Identifier"
                        value={procedure.urIdentifier}
                        mode="outlined"
                        onChangeText={text => {
                            dispatch(procedureUpdated({ id: props.procedureId, changes: { urIdentifier: text } }));
                            procedureService.updateProcedureAsync({ id: props.procedureId, changes: { urIdentifier: text } })
                        }}
                    />
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
                </ScrollView>

                <Divider style={styles.divider} />
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
    procTextInput: { ...Inputs.form.text },
    procDateInput: { ...Inputs.form.datePicker },
    imgThumbnail: {
        ...Images.images.thumbnail,
        marginTop: 5
    },
    divider: { ...Containers.container.divider },

});

export default ProcedureDetails;