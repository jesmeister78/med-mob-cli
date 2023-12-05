import { Image, View } from "react-native";

type ImageSummaryProps = {
    rawImageSource: string,
    compositeImageSource?: string,
    labelsImageSource?: string
}

function ImageSummary(props: ImageSummaryProps) {


    return <View>
        <Image
            alt={`source: ${props.rawImageSource}`}
            source={{
                uri: `file://${props.rawImageSource}`,
            }}
        />

        <Image
            alt={`source: ${props.compositeImageSource}`}
            source={{
                uri: `file://${props.compositeImageSource}`,
            }}
        />

        <Image
            alt={`source: ${props.labelsImageSource}`}
            source={{
                uri: `file://${props.labelsImageSource}`,
            }}
        /></View>

}

export default ImageSummary;