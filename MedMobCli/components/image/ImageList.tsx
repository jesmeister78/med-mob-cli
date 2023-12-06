import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

import styles from "../../styles";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ImageSummary from "./ImageSummary";
import { Button, Surface } from "react-native-paper";
import { fetchRawImages, selectRawImagesByProcedureId } from "../../store/rawImages";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import ImageAttributeSection from "./ImageAttributeSection";

type ImageListProp = {
    imageSource?: string,
    procedureId: string
}

function ImageList(props: ImageListProp) {
    console.log("ImageList::props.procedureId: " + props.procedureId)

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.rawImages);
    const rawImages = useAppSelector((state: RootState) => selectRawImagesByProcedureId(state, props.procedureId));
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.procedureId));

    return (
        <>
            {processedImages.map((img) => {
                console.log("ImageList::img.rawImageSource: " + img.rawImageSource);
                console.log("ImageList::img.compositeImageSource: " + img.compositeImageSource);
                console.log("ImageList::img.labelsImageSource: " + img.labelsImageSource);
                return (
                    <Surface style={styles.outerSurface}>
                        <ImageSummary key={img.id}
                            rawImageSource={img.rawImageSource}
                            compositeImageSource={img.compositeImageSource}
                            labelsImageSource={img.labelsImageSource}
                        />
                        {
                            img.attributes?.map( attr => (
                                <ImageAttributeSection  key={attr.name} imageAttribute={attr} />

                            ))
                        }
                    </Surface>
                )
            })}
        </>

    );
}

export default ImageList;
