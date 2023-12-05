import React, { useState } from "react";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from "../../hooks";
import ImageSelectFromFile from "../image/SelectImageFromFile";
import { ProcedureScreenNavProp } from "../../screens/navigation/screenNavProps";
import { ProcessedImage } from "../../domain/processedImage";
import { processedImageAdded } from "../../store/processedImages";


type AddImageProps = {
    procedureId: string,
    addImageSource?: string
}

function AddImage(props: AddImageProps) {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ProcedureScreenNavProp>();

    const [selectImageFromFile, setSelectImageFromFile] = useState(false);

    const addImageToProc = () => {
        const newImage = {
            id: uuidv4(),
            procedureId: props.procedureId,
            imageTimestamp: Date.now(),
            rawImageSource: props.addImageSource
        } as ProcessedImage;
        dispatch(processedImageAdded(newImage));
        navigation.navigate("Procedure", {imageSource:props.addImageSource, procedureId:props.procedureId})
    };

    const addImgThenNavToProcDetails = () => {

    };

    return (
        !props.addImageSource ? ( // no image source yet, need to get it from camera or file
            <Card.Actions>
                <Button onPress={() => setSelectImageFromFile(true)}>Choose from Device</Button>

                <ImageSelectFromFile show={selectImageFromFile} setShowCamera={setSelectImageFromFile} setImage={addImageToProc} />

                <Button onPress={() => navigation.navigate('Capture', {procedureId:props.procedureId})} >Capture</Button>

            </Card.Actions>
        ) : ( // we have already captured the image, let's add it to a procedure

            <Card.Actions>
                <Button icon="paperclip" onPress={() => addImageToProc()}>Attach</Button>
            </Card.Actions>

        )
    )
}

export default AddImage;