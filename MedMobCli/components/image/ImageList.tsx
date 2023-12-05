import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

import styles from "../../styles";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ImageSummary from "./ImageSummary";
import { Button } from "react-native-paper";
import { fetchRawImages, selectRawImagesByProcedureId } from "../../store/rawImages";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";

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

    useEffect(() => { dispatch(fetchRawImages()) }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    const handleReload = async () => {
        await dispatch(fetchRawImages())
    }

    return (
        <View>
            <Button onPress={handleReload} >Reload</Button>
            {rawImages.map((img) => {
                console.log("ImageList::img.rawImageSource: " + img.rawImageSource);
                return <ImageSummary key={img.id}
                    rawImageSource={img.rawImageSource}
                />
            })}

            {processedImages.map((img) => {
                console.log("ImageList::img.compositeImageSource: " + img.compositeImageSource);
                console.log("ImageList::img.labelsImageSource: " + img.labelsImageSource);
                return <ImageSummary key={img.id}
                    rawImageSource={img.rawImageSource}
                    compositeImageSource={img.compositeImageSource}
                    labelsImageSource={img.labelsImageSource}
                />
            })}
        </View>
    );
}

export default ImageList;
