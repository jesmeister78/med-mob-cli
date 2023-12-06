import React, { useState } from "react";
import { ToggleButton } from "react-native-paper";

type ImageAttributeToggleProp = {
    isPresent: boolean
}

function ImageAttributeToggle(props: ImageAttributeToggleProp) {

    const [value, setValue] = useState(props.isPresent ? "left":"right");
    return (
        <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
            <ToggleButton icon="check" value="left" />
            <ToggleButton icon="close" value="right" />
        </ToggleButton.Row>
    )
}

export default ImageAttributeToggle;