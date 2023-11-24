import { Text, View } from "react-native";
import styles from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState, store } from "../store";
import procedures, { procedureUpdated, selectAllProcedures, selectProcedureById } from "../store/procedures";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-paper";



function Procedure() {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.procedures);
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, '1'));
    if (procedure) {
        return (
            <View key={procedure.id}>
                <TextInput
                    label="Case Number:"
                    value={procedure.id}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {caseNumber: +text}}))}
                />
                <TextInput
                    label="Patient Name:"
                    value={procedure.patientName}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {patientName: text}}))}
                    />
                <TextInput
                    label="Procedure Date:"
                    value={procedure.date}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {date: text}}))} />
                <TextInput
                    label="Surgeon Name:"
                    value={procedure.surgeon}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {surgeon: text}}))} />
                <TextInput
                    label="Hospital:"
                    value={procedure.hospital}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {hospital: text}}))} />
                <TextInput
                    label="Indication:"
                    value={procedure.indication}
                    onChangeText={text => dispatch(procedureUpdated({id: 1, changes: {indication: text}}))} />
            </View>

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