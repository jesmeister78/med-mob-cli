import { ActivityIndicator, Button, Text, View } from "react-native";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import styles from "../styles";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProcedures, selectAllProcedures } from "../store/procedures";


function SurgeryList() {

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.procedures);
  const procedures = useAppSelector(selectAllProcedures);

  useEffect(() => {
    dispatch(fetchProcedures()).unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        console.log(originalPromiseResult)
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log(rejectedValueOrSerializedError)
        console.log('blah')
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  const handleReload = async () => {
    await dispatch(fetchProcedures())
      .then(unwrapResult)
      .then(originalPromiseResult => {
        <View style={styles.dataContainer}>
        <Text>{originalPromiseResult.toString()}</Text>
      </View>
      })
      .catch(rejectedValueOrSerializedError => {
        <Text>{rejectedValueOrSerializedError.toString()}</Text>
      })
  }
  return (
    <View>
      <Button title={'Reload'} onPress={handleReload} />
      {procedures.map((procedure) => {
        return (
          <View style={styles.container} key={procedure.id}>
            <View>
              <View style={styles.dataContainer}>
                <Text>
                  {procedure.id} {procedure.patientName} {procedure.date.toISOString()}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>{procedure.surgeon} {procedure.hospital}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default SurgeryList;
