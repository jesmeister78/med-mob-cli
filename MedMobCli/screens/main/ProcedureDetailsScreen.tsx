import { ScrollView, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import ProcedureDetails from "../../components/procedure/ProcedureDetails";
import { Containers } from "../../styles";
import { ProcedureDetailsScreenRouteProp } from "../navigation/screenNavProps";
import ErrorComponent from "../../components/Error";
import React from "react";



function ProcedureDetailsScreen({ route }: ProcedureDetailsScreenRouteProp) {

    return (
        <>

            <ProcedureDetails procedureId={route.params.procedureId} />

        </>
    )
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
});

export default ProcedureDetailsScreen;