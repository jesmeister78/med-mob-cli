import { StyleSheet, View } from "react-native";
import ImageAttribute from "../../domain/imageAttribute";
import { Divider, Icon, Text } from "react-native-paper";
import ImageAttributeToggle from "./ImageAttributeToggle";
import ImageAttributeDetails from "./ImageAttributeDetails";
import { Containers } from "../../styles";
import { attributeColour } from "../../domain/constants/attributeColourMap";

type ImageAttributeSectionProp = {
    imageAttribute: ImageAttribute,
    index: number,
    toggleFunc: (index: number) => void
};

function ImageAttributeSection(props: ImageAttributeSectionProp) {
    console.log("props.imageAttribute.code: " + props.imageAttribute.code)
    console.log("props.imageAttribute.show: " + props.imageAttribute.show)
    const getColour = (code: string): string => {
        const key = code as keyof typeof attributeColour;
        return attributeColour[key]
    }
   
    return (
        <View key={props.index} style={styles.container}>

            <View style={styles.row}>
                <View style={styles.iconCell}>
                    <ImageAttributeToggle
                        show={props.imageAttribute.show}
                        index={props.index}
                        toggleFunc={props.toggleFunc}
                        colour={props.imageAttribute.colour}
                    />
                </View>
                <View style={styles.textCell}>
                    <Text variant="titleSmall">{props.imageAttribute.name}</Text>
                </View> 
            </View>
            <Divider style={styles.divider} />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    surface: { ...Containers.container.outerSurface },
    row: { 
        ...Containers.container.row, 
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'green' 
    },
    cell: {
        ...Containers.container.cell,
        // width: '95%',
        // justifyContent: 'center',
        // height:'100%',
         borderWidth: 1,
         borderColor: 'blue'
    },
    iconCell: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex:3,
        width: '35%',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    textCell: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 8,
        //justifyContent: 'center',
        width: '65%',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'red'

    },
    emptyCell: { 
        flex: 1, 
        // borderColor: 'red'
    },
    divider: { ...Containers.container.divider }
});
export default ImageAttributeSection;