import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Containers, Images } from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import { imageMode } from "../../domain/constants/imageMode";


type ProcedureImagesProp = {
    procedureId: string
}

function ProcedureImages(props: ProcedureImagesProp) {
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.procedureId));
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const navToProcessedImageDetails = (imageId: string, imgMode: string) => {
        navigation.navigate("ProcessedImage", { imageId: imageId, mode: imgMode })
    };
    console.log('ProcedureImages::processedImages.length: ' + processedImages)
    console.log('ProcedureImages::processedImages[0].rawImageSource: ' + processedImages[0]?.rawImageSource)
    console.log('ProcedureImages::processedImages[0].compositeImageSource: ' + processedImages[0]?.compositeImageSource)
    // TODO: need to show more than just the first image
    return processedImages && processedImages.length > 0 ? (
        <View style={styles.imgContainer}>
            {
                processedImages.map(img => {
                    const src = img.labelsImageSource ?? img.compositeImageSource ?? `file:///${img.rawImageSource}`;
                    return img.labelsImageSource ? (
                        <>
                            <TouchableOpacity
                                onPress={() => navToProcessedImageDetails(img.id, imageMode.LABELS)}
                            >
                                <Image key={img.id}
                                    style={styles.imgThumbnail}
                                    source={{ uri: img.labelsImageSource }}
                                    resizeMode={'cover'}
                                /></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navToProcessedImageDetails(img.id, imageMode.COMPOSITE)}
                            >
                                <Image key={img.id}
                                    style={styles.imgThumbnail}
                                    source={{ uri: img.compositeImageSource }}
                                    resizeMode={'cover'}
                                /></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navToProcessedImageDetails(img.id, imageMode.RAW)}
                            >
                                <Image key={img.id}
                                style={styles.imgThumbnail}
                                source={{ uri: `file:///${img.rawImageSource}` }}
                                resizeMode={'cover'}
                                /></TouchableOpacity></>
                    ) : img.compositeImageSource ? (
                        <>
                            <TouchableOpacity
                                onPress={() => navToProcessedImageDetails(img.id, imageMode.COMPOSITE)}
                            >
                                <Image key={img.id}
                                    style={styles.imgThumbnail}
                                    source={{ uri: img.compositeImageSource }}
                                    resizeMode={'cover'}
                                /></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navToProcessedImageDetails(img.id, imageMode.RAW)}
                            >
                                <Image key={img.id}
                                    style={styles.imgThumbnail}
                                    source={{ uri: `file:///${img.rawImageSource}` }}
                                    resizeMode={'cover'}
                                /></TouchableOpacity></>
                    ) : (
                        <TouchableOpacity
                            onPress={() => navToProcessedImageDetails(img.id, imageMode.RAW)}
                        >
                            <Image key={img.id}
                                style={styles.imgThumbnail}
                                source={{ uri: `file:///${img.rawImageSource}` }}
                                resizeMode={'cover'}
                            /></TouchableOpacity>
                    )
                })
            }
        </View>


    ) : (null)
}

const styles = StyleSheet.create({
    imgContainer: { ...Containers.container.row },
    imgThumbnail: { ...Images.images.thumbnail },
});

export default ProcedureImages;