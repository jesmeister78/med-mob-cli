import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect } from "react";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProcedures, selectAllProcedures } from "../../store/procedures";
import ProcedureSummary from "./ProcedureSummary";
import { Button, Surface } from "react-native-paper";

type ProcedureListProp = {
  imageId?: string,
}

function ProcedureList(props: ProcedureListProp) {
  console.log("Proc list")
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.procedures);
  const procedures = useAppSelector(selectAllProcedures);

  useEffect(() => { dispatch(fetchProcedures()) }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const handleReload = async () => {
    await dispatch(fetchProcedures())
  }
  
  return (
    <>
      <Button onPress={handleReload} >Reload</Button>
      {procedures.map((procedure) => 
         
          <ProcedureSummary key={procedure.id} procedureId={procedure.id} addImageId={props.imageId} />
      )}
    </>
  );
}

const styles = StyleSheet.create(
  {
    loader: {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
  }
)

export default ProcedureList;
