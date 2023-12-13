import { StyleSheet, View } from "react-native";
import ImageAttributeDetail from "../../domain/imageAttributeDetail";
import { Text } from "react-native-paper";
import { Containers } from "../../styles";

type ImageAttributeDetailsProp = {
    details?: ImageAttributeDetail[]
}

function ImageAttributeDetails(props: ImageAttributeDetailsProp) {

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
export default ImageAttributeDetails;