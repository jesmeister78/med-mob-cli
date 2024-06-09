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

type ImageListProp = {
    imageId: string,
}

function ImageWithAttributes(props: ImageListProp) {
    const [mode, setMode] = useState('orig');
    const img = useAppSelector((state: RootState) => selectProcessedImageById(state, props.imageId));
    const dispatch = useAppDispatch();

    console.log("props.imgid: " + props.imageId)

    useEffect(() => {
        if (img)
            dispatch(fetchProcessedImages(img));
    }, []);

    return img ? (
        <Surface style={styles.surface}>
            {mode === 'orig' ? (
                <Image
                    style={{ width: '100%', height: 300 }}
                    alt={`source: ${img.rawImageSource}`}
                    source={{
                        uri: `file://${img.rawImageSource}`,
                    }}
                />
            ) : (
                mode === 'comp' ? (
                    <Image
                        style={{ width: 200, height: 200 }}
                        alt={`source: ${img.compositeImageSource}`}
                        source={{
                            uri: `${img.compositeImageSource}`,
                        }}
                    />
                ) : (
                    <Image
                        style={{ width: 200, height: 200 }}
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
                img.attributes?.map(attr => (
                    <ImageAttributeSection key={attr.name} imageAttribute={attr} />

                ))
            }
            <View style={styles.spacer}></View>
            <ImageViewMode toggleImageViewMode={(value) => setMode(value)} />
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
