import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { GestureResponderEvent } from "react-native";

type ImageViewModeProp = {
    toggleImageViewMode: (e: GestureResponderEvent) => void
}

function ImageViewMode(props: ImageViewModeProp) {

    const [value, setValue] = useState('orig');

    return (
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
            buttons={[
                {
                    value: 'orig',
                    label: 'Original',
                    onPress: props.toggleImageViewMode,
                },
                {
                    value: 'comp',
                    label: 'Composite',
                    onPress: props.toggleImageViewMode,
                },
                {
                    value: 'labels',
                    label: 'Labels',
                    onPress: props.toggleImageViewMode,
                },
            ]}
        />
    );
}

export default ImageViewMode;