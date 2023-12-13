import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ToggleButton } from "react-native-paper";
import { Containers } from "../../styles";

type ImageAttributeToggleProp = {
    isPresent: boolean
}

function ImageAttributeToggle(props: ImageAttributeToggleProp) {

    const [value, setValue] = useState(props.isPresent ? "left" : "right");
    return (
        <View style={styles.cell}>
            <ToggleButton.Row
                style={styles.buttonRow}
                onValueChange={value => setValue(value)}
                value={value}
            >
                <ToggleButton icon="check"  value="left" />
                <ToggleButton icon="close" value="right" />
            </ToggleButton.Row>

        </View>
    )
}

const styles = StyleSheet.create({
    buttonRow: {  },
    row: { ...Containers.container.row },
    cell: { ...Containers.container.cell },
});
export default ImageAttributeToggle;