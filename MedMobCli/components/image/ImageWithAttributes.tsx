import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Divider, Surface, Text } from "react-native-paper";
import { fetchProcessedImages, selectProcessedImageById } from "../../store/processedImages";
import ImageAttributeSection from "./ImageAttributeSection";
import { Containers } from "../../styles";
import ImageViewMode from "./ImageViewMode";
import SendImageToRobot from "./SendImageToRobot";
import { imageMode } from "../../domain/constants/imageMode";
import { env } from "../../environment";

type ImageListProp = {
    imageId: string,
    mode: string
}

function ImageWithAttributes(props: ImageListProp) {
    const [mode, setMode] = useState(props.mode);
    const img = useAppSelector((state: RootState) => selectProcessedImageById(state, props.imageId));
    const dispatch = useAppDispatch();

    const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;

    console.log("props.imgid: " + props.imageId)
    console.log("props.mode: " + props.mode)

    useEffect(() => {
        console.log('ImageWithAttributes::img.compositeImageSource = ' + img!.compositeImageSource)
        console.log('ImageWithAttributes::env.XRAI_API_DEFAULT_IMG = ' + env.XRAI_API_DEFAULT_IMG)
        // if we have not already processed this image we do it on screen load
        if (img && (!img.compositeImageSource || img.compositeImageSource === defaultImgPath))
            dispatch(fetchProcessedImages(img));
    }, []);

    return img ? (
        <Surface style={styles.surface}>
            {mode === imageMode.RAW ? (
                <Image  key={`img.id${mode}`} 
                    style={{ width: '100%', height: 300 }}
                    alt={`source: ${img.rawImageSource}`}
                    source={{
                        uri: `file://${img.rawImageSource}`,
                    }}
                />
            ) : (
                mode === imageMode.COMPOSITE ? (
                    <Image key={`img.id${mode}`}
                        style={{ width: '100%', height: 300 }}
                        alt={`source: ${img.compositeImageSource}`}
                        source={{
                            uri: `${img.compositeImageSource}`,
                        }}
                    />
                ) : (
                    <Image key={`img.id${mode}`}
                        style={{ width: '100%', height: 300 }}
                        alt={`source: ${img.labelsImageSource}`}
                        source={{
                            uri: `${img.labelsImageSource}`,
                        }}
                    />
                )
            )}
            <SendImageToRobot imageId={img.id} />

            <Divider style={styles.divider} />
            {
                img.attributes?.map((attr, index) => (
                    <ImageAttributeSection key={attr.name} imageAttribute={attr} index={index} toggleFunc={()=>null} />

                ))
            }
            <View style={styles.spacer}></View>
            <ImageViewMode toggleImageViewMode={(value) => setMode(value)} mode={ props.mode} />
        </Surface>
    ) : (
        <Surface style={styles.notFound}>
            <Text>
                Image not found.
            </Text>
        </Surface>
    )
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface, marginTop: 15, width: '100%' },
    notFound: { ...Containers.container.outerSurface, marginTop: 15, width: '100%', height: '100%', justifyContent: 'center' },
    spacer: { ...Containers.container.spacer },
    row: { ...Containers.container.row },
    cell: { ...Containers.container.cell },
    divider: { ...Containers.container.divider },
});

export default ImageWithAttributes;
