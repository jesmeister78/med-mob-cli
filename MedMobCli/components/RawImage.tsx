import { Image, Text, View } from "react-native";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { selectImageById } from "../store/images";


type RawImageProps = {
    procedureId: string
    imageId: string
}


function RawImage(props: RawImageProps){
    const image = useAppSelector((state: RootState) => selectImageById(state, props.imageId));

    if(image){

        return (
            <Image
                source={{
                    uri: `file://${image.imageSource}`,
                  }}
            ></Image>
        );
    } else return (
        <View>
            <Text>Image not found.</Text>
        </View>
    );

}

export default RawImage;