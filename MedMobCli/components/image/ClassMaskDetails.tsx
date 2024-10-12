import { StyleSheet, View } from "react-native";
import ClassMaskDetail from "../../domain/classMaskDetail";
import { Text } from "react-native-paper";
import { Containers } from "../../styles";

type ClassMaskDetailsProp = {
    details?: ClassMaskDetail[]
}

function ClassMaskDetails(props: ClassMaskDetailsProp) {

    return (

        props.details && props.details.length > 0 ?
            (
                <View style={styles.cell}>
                    {props.details.map(detail =>
                        <View key={detail.label} style={styles.row}>
                            <Text>{detail.label}: </Text>
                            <Text>{detail.value}</Text>
                        </View>)}
                </View>
            ) : (null)

    )
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    row: { ...Containers.container.row },
    cell: { ...Containers.container.cell },
});
export default ClassMaskDetails;