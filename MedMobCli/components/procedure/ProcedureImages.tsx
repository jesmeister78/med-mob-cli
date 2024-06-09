import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ProcessedImage } from "../../domain/processedImage";
import { Containers, Images } from "../../styles";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";


type ProcedureImagesProp = {
    procedureId: string
}

function ProcedureImages(props: ProcedureImagesProp) {
    const processedImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.procedureId));
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const navToProcessedImageDetails = (imageId: string) => {
        navigation.navigate("ProcessedImage", { imageId: imageId })
    };
    console.log('ProcedureImages::processedImages.length: ' + processedImages)
    console.log('ProcedureImages::processedImages[0].rawImageSource: ' + processedImages[0]?.rawImageSource)
    // TODO: need to show more than just the first image
    return processedImages && processedImages.length > 0 ? (
        <View style={styles.imgContainer}>
            {
                processedImages.map(img => {
                    const src = img.labelsImageSource ?? img.compositeImageSource ?? `file:///${img.rawImageSource}`;
                    return <TouchableOpacity key={img.id}
                        onPress={() => navToProcessedImageDetails(img.id)}
                    ><Image key={img.id}
                        style={styles.imgThumbnail}
                        source={{ uri: src }}
                        resizeMode={'cover'}
                        /></TouchableOpacity>
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