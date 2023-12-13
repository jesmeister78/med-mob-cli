import { StyleSheet, View } from "react-native";
import ImageAttribute from "../../domain/imageAttribute";
import { Divider, Text } from "react-native-paper";
import ImageAttributeToggle from "./ImageAttributeToggle";
import ImageAttributeDetails from "./ImageAttributeDetails";
import { Containers } from "../../styles";

type ImageAttributeSectionProp = {
    imageAttribute: ImageAttribute
};

function ImageAttributeSection(props: ImageAttributeSectionProp) {

    return (
        <View>

            <View key={props.imageAttribute.name} style={styles.row}>
                <View style={styles.cell}>
                    <Text variant="titleMedium">{props.imageAttribute.name}</Text>

                </View>
                <ImageAttributeToggle isPresent={props.imageAttribute.isPresent} />
                <ImageAttributeDetails details={props.imageAttribute.details} />
            </View>
            <Divider style={styles.divider} />
        </View>

    )

}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    row: { ...Containers.container.row, marginTop: 5 },
    cell: {
        ...Containers.container.cell,
        width: '30%',
        justifyContent: 'flex-end',
        // height:'100%',
        // borderWidth: 1,
        // borderColor: 'black'
    },
    divider: {...Containers.container.divider}
});
export default ImageAttributeSection;