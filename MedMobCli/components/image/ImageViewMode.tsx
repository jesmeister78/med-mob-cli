import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { GestureResponderEvent } from "react-native";

type ImageViewModeProp = {
    toggleImageViewMode: (e: string) => void
}

function ImageViewMode(props: ImageViewModeProp) {

    const [value, setValue] = useState('orig');
    const handleChange = (value: string) => {
        setValue(value);
        props.toggleImageViewMode(value);
    }
    return (
        <SegmentedButtons
            value={value}
            onValueChange={handleChange}
            buttons={[
                {
                    value: 'orig',
                    label: 'Original',
                    //onPress: () =>props.toggleImageViewMode(value),
                },
                {
                    value: 'comp',
                    label: 'Composite',
                },
                {
                    value: 'labels',
                    label: 'Labels',
                },
            ]}
        />
    );
}

export default ImageViewMode;