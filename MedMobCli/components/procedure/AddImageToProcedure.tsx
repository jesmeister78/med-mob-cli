import React, { useContext, useState } from "react";
import { Card, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "../../hooks";
import ImageSelectFromFile from "../image/SelectImageFromFile";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import AttachImageButton from "../image/AttachImageButton";
import showCameraContext from "../../context/showCameraContext";
import { xraiImageUpdated } from "../../store/xraiImageSlice";
import { imageService } from "../../services/imageService";


type AddImageProps = {
    procedureId: string,
    addImageId?: string
}

function AddImageToProcedure(props: AddImageProps) {
    const { setShowCamera } = useContext(showCameraContext);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ProcedureListScreenNavProp>();

    const [selectImageFromFile, setSelectImageFromFile] = useState(false);

    const associateProcedureToImage = () => {
        // const newImage = {
        //     id: uuidv4(),
        //     procedureId: props.procedureId,
        //     imageTimestamp: Date.now(),
        //     rawImageSource: props.addImageId
        // } as ProcessedImage;
        dispatch(xraiImageUpdated({ id: props.procedureId, changes: { procedureId: props.procedureId } }))
        navigation.navigate("ProcedureDetails", { procedureId: props.procedureId })
    };

    const captureNewImage = () => {
        setShowCamera(true);
        navigation.navigate('Capture', { procedureId: props.procedureId, showCamera: true })
    };

    return (
        !props.addImageId ? 
        ( 
            // no image source yet, need to get it from camera or file
            <Card.Actions>
                <IconButton
                    icon={"folder"}
                    mode="contained"
                    onPress={() => setSelectImageFromFile(true)} />

                <ImageSelectFromFile show={selectImageFromFile} setShow={setSelectImageFromFile} setImage={associateProcedureToImage} />

                <IconButton
                    icon={"camera"}
                    mode="contained"
                    onPress={() => captureNewImage()} />

            </Card.Actions>
        ) : ( 
            // we have already captured the image, let's add it to a procedure
            <Card.Actions>
                <AttachImageButton procedureId={props.procedureId} imageId={props.addImageId} />
            </Card.Actions>
        )
    )
}

export default AddImageToProcedure;