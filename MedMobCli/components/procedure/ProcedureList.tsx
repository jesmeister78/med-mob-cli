import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect } from "react";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProcedures, selectAllProcedures, selectProceduresByUserId } from "../../store/procedureSlice";
import ProcedureSummary from "./ProcedureSummary";
import { Button, Card, List, Surface } from "react-native-paper";
import { selectCurrentUser } from '../../store/userSlice';
import { Cards } from '../../styles';
import CenteredIcon from '../CenteredIcon';
import { useNavigation } from '@react-navigation/native';
import { ProcedureListScreenNavProp } from '../../screens/navigation/screenNavProps';

type ProcedureListProp = {
  imageId?: string,
}

function ProcedureList(props: ProcedureListProp) {
  const navigation = useNavigation<ProcedureListScreenNavProp>();

  console.log("Proc list")
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.procedures);
  const user = useAppSelector(selectCurrentUser);
  const procedures = useAppSelector((state: RootState) => selectProceduresByUserId(state, user?.id));

  useEffect(() => { user && dispatch(fetchProcedures(user.id)) }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const handleReload = async () => {
    user && dispatch(fetchProcedures(user.id))
  }

  return ( procedures && procedures.length > 0 ? (
    <>
      {procedures.map((procedure) =>

        <ProcedureSummary key={procedure.id} procedureId={procedure.id} addImageId={props.imageId} />
      )}
    </>) : (
            <List.Item
            title="No Procedures yet..."
            titleStyle={styles.centerText}
            left={() => <CenteredIcon icon="robot-dead" />}
            onPress={() => navigation.navigate('Home')}
            style={styles.listItem}
        />
            )
  );
}

const styles = StyleSheet.create(
  {
    loader: {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    centerText: {
        textAlign: 'center',
        flex: 1,
        marginLeft: -44,
        fontSize: 18, // Default is typically 12, increased by 50%
    },
    listItem: {
        paddingLeft: 0,
        height: 60, // Increased height to accommodate larger text and icons
    },
    card: { ...Cards.cards.procedureSummary },
  }
)

export default ProcedureList;
