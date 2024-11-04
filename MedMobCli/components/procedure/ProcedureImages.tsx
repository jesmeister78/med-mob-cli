import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Containers, Images } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { fetchImagesForProcedure, selectImagesByProcedureId } from "../../store/imageSlice";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import { imageMode } from "../../domain/constants/imageMode";
import { env } from "../../environment";
import { selectProcedureById } from "../../store/procedureSlice";
import { getImagePathPrefix } from "../../domain/imageUtilityService";
import { useEffect } from "react";


type ProcedureImagesProp = {
    procedureId: string
}

function ProcedureImages(props: ProcedureImagesProp) {
    const dispatch = useAppDispatch();
    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.procedureId));
    const thumbnails = useAppSelector((state: RootState) => selectImagesByProcedureId(state, props.procedureId));
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const navToProcessedImageDetails = (imageId: string, imgMode: string) => {
        navigation.navigate("ProcessedImage", { imageId: imageId, mode: imgMode })
    };
    // const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;

    thumbnails.map((i, idx) => console.log(`image ${idx}: ${i.rawImageSource}`))
   
    useEffect(() => {
        dispatch(fetchImagesForProcedure(props.procedureId));
    }, []);
    // TODO: need to show more than just the first image
    return procedure && thumbnails && thumbnails.length > 0 ? (
        <View style={styles.imgContainer}>
            {
                thumbnails.map((img, index) => {
                    const path = `${getImagePathPrefix(img.rawImageSource)}${img.rawImageSource}`
                    console.log(`mapping img ${index}: ${path}`)
                    return img.rawImageSource ? (
                        <TouchableOpacity key={index}
                            onPress={() => navToProcessedImageDetails(img.id, imageMode.RAW)}
                        >
                            <Image key={index}
                                style={styles.imgThumbnail}
                                source={{ uri: path }}
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