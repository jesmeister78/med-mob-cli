import React, { useState } from "react";
import { ToggleButton } from "react-native-paper";

type ImageAttributeToggleProp = {
    isPresent: boolean
}

function ImageAttributeToggle(props: ImageAttributeToggleProp) {

    const [value, setValue] = useState(props.isPresent ? "left":"right");
    return (
        <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
            <ToggleButton icon="tick" value="left" />
            <ToggleButton icon="cross" value="right" />
        </ToggleButton.Row>
    )
}

export default ImageAttributeToggle;