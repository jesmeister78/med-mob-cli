import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import CaptureImage from "./CaptureImage";
import ImageSelectFromFile from "./SelectImageFromFile";
import { useAppDispatch } from "../hooks";
import { imageAdded } from "../store/images";
import { RawImage } from "../domain/rawImage";


type AddImageProps = {
    procedureId: string
}

function AddImage(props: AddImageProps) {
    const dispatch = useAppDispatch();

    const [showCaptureImage, setShowCaptureImage] = useState(false);
    const [selectImageFromFile, setSelectImageFromFile] = useState(false);

    const addImageToProc = (imgSource: string ) => {
        const newImage = {
            id: 'todo: generate uuidv4',
            procedureId: props.procedureId,
            imageTimestamp: Date.now(),
            imageSource: imgSource
        } as RawImage;
        dispatch(imageAdded(newImage));
    };

    

    return (
        <Card.Actions>
            <Button
                onPress={() => setShowCaptureImage(true)}
            >Capture</Button>
            <Button
                onPress={() => setSelectImageFromFile(true)}
            >Choose from Device</Button>
            <ImageSelectFromFile show={selectImageFromFile} setVisible={setSelectImageFromFile} setImage={addImageToProc} />
            <CaptureImage show={showCaptureImage} setVisible={setShowCaptureImage} setImage={addImageToProc} />

        </Card.Actions>

    );
}

export default AddImage;