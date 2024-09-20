import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Containers, Images } from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import { imageMode } from "../../domain/constants/imageMode";
import { env } from "../../environment";


type ProcedureImagesProp = {
    procedureId: string
}

function ProcedureImages(props: ProcedureImagesProp) {
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.procedureId));
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const navToProcessedImageDetails = (imageId: string, imgMode: string) => {
        navigation.navigate("ProcessedImage", { imageId: imageId, mode: imgMode })
    };
    const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;

    console.log('ProcedureImages::processedImages.length: ' + processedImages.length)
    if (processedImages.length > 0) {
        console.log('ProcedureImages::processedImages[0].rawImageSource: ' + processedImages[0]?.rawImageSource)
        console.log('ProcedureImages::processedImages[0].compositeImageSource: ' + processedImages[0]?.compositeImageSource)
    }

    // TODO: need to show more than just the first image
    return processedImages && processedImages.length > 0 ? (
        <View style={styles.imgContainer}>
            {
                processedImages.map((img, index) => {
                    return img.rawImageSource ? (
                        <TouchableOpacity key={index}
                            onPress={() => navToProcessedImageDetails(img.id, imageMode.RAW)}
                        >
                            <Image key={index}
                                style={styles.imgThumbnail}
                                source={{ uri: `file:///${img.rawImageSource}` }}
                                resizeMode={'cover'}
                            /></TouchableOpacity>
                    ) : (null)
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