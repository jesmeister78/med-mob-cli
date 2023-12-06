import { View } from "react-native";
import ImageAttributeDetail from "../../domain/imageAttributeDetail";
import { Text } from "react-native-paper";
import styles from "../../styles";

type ImageAttributeDetailsProp = {
    details?: ImageAttributeDetail[]
}

function ImageAttributeDetails(props: ImageAttributeDetailsProp) {

    return (

        props.details && props.details.length > 0 ?
            (
                <View style={styles.imgAttributeDetailContainer}>
                    {props.details.map(detail =>
                        <View key={detail.label} style={styles.imgAttributeDetailSection}>
                            <Text>{detail.label}: </Text>
                            <Text>{detail.value}</Text>
                        </View>)}
                </View>
            ) : (null)

    )
}

export default ImageAttributeDetails;