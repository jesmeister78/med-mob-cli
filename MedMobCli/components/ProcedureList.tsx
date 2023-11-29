import { ActivityIndicator, Text, View } from "react-native";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import styles from "../styles";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProcedures, selectAllProcedures } from "../store/procedures";
import ProcedureSummary from "./ProcedureSummary";
import { Button } from "react-native-paper";

type ProcedureListProp = {
  imageSource?: string,
}

function ProcedureList(props: ProcedureListProp) {

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.procedures);
  const procedures = useAppSelector(selectAllProcedures);

  useEffect(() => { dispatch(fetchProcedures()) }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const handleReload = async () => {
    await dispatch(fetchProcedures())
      // .then(unwrapResult)
      // .then(originalPromiseResult => {
      //   <View >
      //     <Text>{originalPromiseResult.toString()}</Text>
      //   </View>
      // })
      // .catch(rejectedValueOrSerializedError => {
      //   <Text>{rejectedValueOrSerializedError.toString()}</Text>
      // })
  }
  
  return (
    <View>
      <Button onPress={handleReload} >Reload</Button>
      {procedures.map((procedure) => 
         
          <ProcedureSummary key={procedure.id} id={procedure.id} imageSource={props.imageSource} />
      )}
    </View>
  );
}

export default ProcedureList;
