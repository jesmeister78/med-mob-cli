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
                props.details.map(detail =>
                    <View key={detail.label} style={styles.imgAttributeSection}>
                        <Text>{detail.label}: </Text>
                        <Text>{detail.value}</Text>
                    </View>)
            ) : (null)

    )
}

export default ImageAttributeDetails;