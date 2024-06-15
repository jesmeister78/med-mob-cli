import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { imageMode } from "../../domain/constants/imageMode";

type ImageViewModeProp = {
    toggleImageViewMode: (e: string) => void,
    mode: string
}

function ImageViewMode(props: ImageViewModeProp) {

    const [value, setValue] = useState(props.mode);
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
                    value: imageMode.RAW,
                    label: 'Original',
                },
                {
                    value: imageMode.COMPOSITE,
                    label: 'Composite',
                },
                {
                    value: imageMode.LABELS,
                    label: 'Labels',
                },
            ]}
        />
    );
}

export default ImageViewMode;