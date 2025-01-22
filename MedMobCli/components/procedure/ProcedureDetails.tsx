import { ScrollView, StyleSheet } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { DatePickerInput } from 'react-native-paper-dates';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import {
    procedureUpdated,
    selectProcedureById,
} from '../../store/procedureSlice';
import ProcedureActionButtons from './ProcedureActionButtons';
import { indications } from '../../domain/constants/indications';
import { surgeryTypes } from '../../domain/constants/surgeryTypes';
import ProcedureImages from './ProcedureImages';
import { Containers, Images, Inputs } from '../../styles';
import ErrorComponent from '../Error';
import { procedureService } from '../../services/procedureService';
import ProcedureDetailsTextInput from './ProcedureDetailsTextInput';
import ProcedureDetailsDropDown from './ProcedureDetailsDropDown';

type ProcedureDetailsProp = {
    procedureId: string;
    addImageId?: string;
};

const ProcedureDetails = (props: ProcedureDetailsProp) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.procedureId),)
    const [localValue, setLocalValue] = useState<string[]>(procedure?.indication?.split(',') || []);

    // Keep local state in sync with prop value
    useEffect(() => {
        const newValues = procedure?.indication?.split(',')|| [];
        if (JSON.stringify(newValues) !== JSON.stringify(localValue)) {
            setLocalValue(newValues);
        }
    }, [procedure?.indication]);

    if (procedure) {
        return (
            <Surface key={procedure.id} style={styles.surface}>
                <ErrorComponent />
                <Text variant="titleMedium">
                    Tap on an image to send it to the xrAI engine
                </Text>
                <Divider style={styles.divider} />
                <ScrollView horizontal={true}>
                    <ProcedureImages procedureId={procedure.id} />
                </ScrollView>
                <Divider style={styles.divider} />
                <ScrollView>
                    <ProcedureDetailsTextInput
                        procedureId={props.procedureId}
                        fieldName="caseNumber"
                        label="Case Number"
                        value={procedure.caseNumber}
                    />
                    <ProcedureDetailsTextInput
                        procedureId={props.procedureId}
                        fieldName="urIdentifier"
                        label="UR Identifier"
                        value={procedure.urIdentifier}
                    />
                    <ProcedureDetailsTextInput
                        procedureId={props.procedureId}
                        fieldName="patientName"
                        label="Patient Name"
                        value={procedure.patientName}
                    />
                    <DatePickerInput
                        style={styles.procDateInput}
                        locale="en-GB"
                        label="Procedure Date"
                        value={new Date(procedure.date)}
                        onChange={d => {
                            dispatch(
                                procedureUpdated({
                                    id: props.procedureId,
                                    changes: { date: d?.toISOString() },
                                }),
                            );
                            procedureService.updateProcedureAsync({
                                id: props.procedureId,
                                changes: { date: d?.toISOString() },
                            });
                        }}
                        inputMode="start"
                        mode="outlined"
                    />
                    <ProcedureDetailsTextInput
                        procedureId={props.procedureId}
                        fieldName="surgeon"
                        label="Surgeon Name"
                        value={procedure.surgeon}
                    />
                    <ProcedureDetailsDropDown
                        procedureId={props.procedureId}
                        fieldName="surgeryType"
                        label="Surgery Type"
                        value={procedure.surgeryType}
                        list={surgeryTypes}
                    />
                    <ProcedureDetailsTextInput
                        procedureId={props.procedureId}
                        fieldName="hospital"
                        label="Hospital"
                        value={procedure.hospital}
                    />
                    <ProcedureDetailsDropDown
                        procedureId={props.procedureId}
                        fieldName="indication"
                        label="Indications"
                        value={procedure.indication}
                        list={indications}
                        multiselect
                    />
                </ScrollView>

                <Divider style={styles.divider} />
                <ProcedureActionButtons
                    procedureId={props.procedureId}
                    onSuccess={path => {
                        console.log('PDF generated at:', path);
                        // Add your success handling here
                    }}
                    onError={error => {
                        console.error('Failed to generate PDF:', error);
                        // Add your error handling here
                    }}
                />
            </Surface>
        );
    } else
        return (
            <Surface style={styles.surface}>
                <Text>Procedure not found.</Text>
            </Surface>
        );
};

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    spacer: { ...Containers.container.spacer },
    procTextInput: { ...Inputs.form.text },
    procDateInput: { ...Inputs.form.datePicker },
    imgThumbnail: {
        ...Images.images.thumbnail,
        marginTop: 5,
    },
    divider: { ...Containers.container.divider },
});

export default ProcedureDetails;
