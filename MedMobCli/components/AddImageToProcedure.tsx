import React, { useState } from "react";
import { Button, Card } from "react-native-paper";
import ImageSelectFromFile from "./SelectImageFromFile";
import { useAppDispatch } from "../hooks";
import { imageAdded } from "../store/images";
import { RawImage } from "../domain/rawImage";
import { useNavigation } from "@react-navigation/native";
import { ProcedureScreenNavProp } from "../screens/navigation/screenNavProps";


type AddImageProps = {
    procedureId: string,
    imageSource?: string
}

function AddImage(props: AddImageProps) {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ProcedureScreenNavProp>();

    const [showCaptureImage, setShowCaptureImage] = useState(false);
    const [selectImageFromFile, setSelectImageFromFile] = useState(false);

    const addImageToProc = (imgSource: string) => {
        const newImage = {
            id: 'todo: generate uuidv4',
            procedureId: props.procedureId,
            imageTimestamp: Date.now(),
            imageSource: imgSource
        } as RawImage;
        dispatch(imageAdded(newImage));
    };



    return (
        !props.imageSource ? ( // no image source yet, need to get it from camera or file
            <Card.Actions>
                <Button onPress={() => setSelectImageFromFile(true)}>Choose from Device</Button>

                <ImageSelectFromFile show={selectImageFromFile} setShowCamera={setSelectImageFromFile} setImage={addImageToProc} />

                <Button onPress={() => navigation.navigate('Capture')} >Capture</Button>

            </Card.Actions>
        ) : ( // we have already captured the image, let's add it to a procedure
            <>
                <Card.Cover
                    source={{ uri: props.imageSource }}
                ></Card.Cover>
                <Card.Actions>
                    <Button icon="paperclip" onPress={() => addImageToProc(props.imageSource!)}>Attach</Button>
                </Card.Actions>
            </>

        )
    )
}

export default AddImage;