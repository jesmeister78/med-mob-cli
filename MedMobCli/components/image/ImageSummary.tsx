import { useState } from "react";
import { Image, View } from "react-native";

type ImageSummaryProps = {
    rawImageSource: string,
    compositeImageSource?: string,
    labelsImageSource?: string,
    imageMode: string
}

function ImageSummary(props: ImageSummaryProps) {

    return <View>
        {
            props.imageMode === 'orig' ? (
                <Image
                    style={{ width: '100%', height: 300 }}
                    alt={`source: ${props.rawImageSource}`}
                    source={{
                        uri: `file://${props.rawImageSource}`,
                    }}
                />
            ) : (
                props.imageMode === 'comp' ? (<Image
                    style={{ width: 200, height: 200 }}
                    alt={`source: ${props.compositeImageSource}`}
                    source={{
                        uri: `file://${props.compositeImageSource}`,
                    }}
                />
                ) : (
                    <Image
                        style={{ width: 200, height: 200 }}
                        alt={`source: ${props.labelsImageSource}`}
                        source={{
                            uri: `file://${props.labelsImageSource}`,
                        }}
                    />
                )
            )
        }


    </View>

}

export default ImageSummary;