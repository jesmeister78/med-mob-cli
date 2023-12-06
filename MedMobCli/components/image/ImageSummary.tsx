import { Image, View } from "react-native";

type ImageSummaryProps = {
    rawImageSource: string,
    compositeImageSource?: string,
    labelsImageSource?: string
}

function ImageSummary(props: ImageSummaryProps) {


    return <View>
        <Image
                style={{ width: 200, height: 200 }}
                alt={`source: ${props.rawImageSource}`}
            source={{
                uri: `file://${props.rawImageSource}`,
            }}
        />
{/* 
        <Image
                style={{ width: 200, height: 200 }}
                alt={`source: ${props.compositeImageSource}`}
            source={{
                uri: `file://${props.compositeImageSource}`,
            }}
        />

        <Image
                style={{ width: 200, height: 200 }}
                alt={`source: ${props.labelsImageSource}`}
            source={{
                uri: `file://${props.labelsImageSource}`,
            }}
        /> */}
        </View>

}

export default ImageSummary;