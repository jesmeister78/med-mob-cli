import { ActivityIndicator, Button, Text, View } from "react-native";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import styles from "../styles";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchSurgeries, selectAllSurgeries } from "../store/surgeries";


function SurgeryList() {

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.surgeries);
  const surgeries = useAppSelector(selectAllSurgeries);

  useEffect(() => {
    dispatch(fetchSurgeries()).unwrap()
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
    await dispatch(fetchSurgeries())
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
      {surgeries.map((surgery) => {
        return (
          <View style={styles.container} key={surgery.id}>
            <View>
              <View style={styles.dataContainer}>
                <Text>
                  {surgery.id} {surgery.patientName} {surgery.date.toISOString()}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>{surgery.surgeon} {surgery.hospital}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default SurgeryList;
