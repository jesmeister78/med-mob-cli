import { View } from "react-native";
import ImageAttribute from "../../domain/imageAttribute";
import styles from "../../styles";
import { Text } from "react-native-paper";
import ImageAttributeToggle from "./ImageAttributeToggle";
import ImageAttributeDetails from "./ImageAttributeDetails";

type ImageAttributeSectionProp = {
    imageAttribute: ImageAttribute
};

function ImageAttributeSection(props: ImageAttributeSectionProp){

    return (
        <View key={props.imageAttribute.name} style={styles.imgAttributeSection}>
            <Text variant="titleSmall">{props.imageAttribute.name}</Text>
            <ImageAttributeToggle isPresent={props.imageAttribute.isPresent} />
            <ImageAttributeDetails details={props.imageAttribute.details} />
        </View>
    )

}

export default ImageAttributeSection;