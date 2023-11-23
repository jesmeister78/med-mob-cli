import { Text, TextInput, View } from "react-native";
import styles from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState, store } from "../store";
import procedures, { selectAllProcedures, selectProcedureById } from "../store/procedures";
import { useSelector } from "react-redux";



function Procedure() {
    
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.procedures);
  const procedure = useAppSelector((state: RootState) => selectProcedureById( state, '1' )) ;
  if(procedure){
    return (
        <View style={styles.container} key={procedure.id}>
          <View>
            <View style={styles.dataContainer}>
              <Text>Case Number:</Text>
              <TextInput>{procedure.id}</TextInput>
            </View>
            <View style={styles.dataContainer}>
              <Text>Patient Name:</Text>
              <TextInput>{procedure.patientName}</TextInput>
            </View>
            <View style={styles.dataContainer}>
              <Text>Date:</Text>
              <TextInput>{procedure.date.toLocaleDateString()}</TextInput>
            </View>
            <View style={styles.dataContainer}>
              <Text>Surgeon:</Text>
              <TextInput>{procedure.surgeon}</TextInput>
            </View>
            <View style={styles.dataContainer}>
              <Text>Hospital:</Text>
              <TextInput>{procedure.hospital}</TextInput>
            </View>
            <View style={styles.dataContainer}>
              <Text>Indication:</Text>
              <TextInput>{procedure.indication}</TextInput>
            </View>
            
          </View>
        </View>
      );}
      else return (
        <View style={styles.container} >
          <View style={styles.dataContainer}>
            <Text>
             Procedure Not Found
            </Text>
          </View>
          
      </View>
      );
}

export default Procedure;