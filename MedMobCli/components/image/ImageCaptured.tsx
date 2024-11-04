import { useContext, useEffect } from "react";
import { Card, IconButton, Tooltip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet } from "react-native";

import { Images } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { addProcedure, fetchProcedures, selectProceduresByUserId, updateProcedure } from "../../store/procedureSlice";
import { imageRemoved, selectImageById, updateImage } from "../../store/imageSlice";
import showCameraContext from "../../context/showCameraContext";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import AttachImageButton from "./AttachImageButton";
import { Procedure } from "../../domain/procedure";
import ProcedureCardCover from "../procedure/ProcedureCardCover";
import { getImagePathPrefix } from "../../domain/imageUtilityService";
import { selectCurrentUser } from "../../store/userSlice";
import { setError } from "../../store/errorSlice";
import React from "react";

type imageCapturedProp = {
    imageId: string,
    procedureId?: string
};

function ImageCaptured(props: imageCapturedProp) {
    const image = useAppSelector((state: RootState) => selectImageById(state, props.imageId));
    const proceduresAvailable = useAppSelector(state => selectProceduresByUserId(state, user?.id));
    const user = useAppSelector(selectCurrentUser);
    const { setShowCamera } = useContext(showCameraContext);

    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const dispatch = useAppDispatch();
    console.log("ImageCaptured::props.imageId: " + props.imageId)
    console.log(`image raw source: ${image?.rawImageSource}`)
    useEffect(() => {
        user && dispatch(fetchProcedures(user?.id));
    }, []);

    const createNewProcedureAndAssociateToImage = async () => {
        if (!user) {
            dispatch(setError("Cannot create Procedure - User does not exist"))
        }
        // create and dispatch the new procedure
        let newProcedure = {
            id: uuidv4(),
            userId: user?.id,
            patientName: '',
            urIdentifier: '',
            date: new Date().toISOString(),
            hospital: '',
            surgeon: '',

            surgeryType: '',

            indication: ''
        } as Procedure;

        try {
            const resultAction = await dispatch(addProcedure(newProcedure));

            if (addProcedure.fulfilled.match(resultAction) && resultAction.payload)
                newProcedure = resultAction.payload;

            console.log('About to update image');
            // Now that we have the new procedure, update the image
            await dispatch(updateImage({ id: props.imageId, changes: { procedureId: newProcedure.id } }));
            console.log('image updated');

            // and set the default image source on the procedure
            await dispatch(updateProcedure({ id: newProcedure.id, changes: { defaultImageSource: image?.rawImageSource } }))

            // Both actions have completed successfully
            console.log('Procedure created and image updated');

            // navigate to the procedure details screen
            navigation.navigate("ProcedureDetails", { procedureId: newProcedure.id });
        } catch (err) {
            // Handle any errors
            console.error('An error occurred:', err);
        }

    };

    const removeImageFromStoreAndTryAgain = () => {
        if (props.imageId) {
            dispatch(imageRemoved(props.imageId));
            setShowCamera(true);
        }
    }

    return image && (
        <Card>
            <Card.Title title="Image Captured"></Card.Title>
            <Card.Cover
                source={{ uri: `${getImagePathPrefix(image?.rawImageSource)}${image?.rawImageSource}` }}
                style={styles.capturedImage}
            />
            <Card.Actions>
                <Tooltip title="Try again">
                    <IconButton
                        icon="restart"
                        mode="contained"
                        onPress={() => removeImageFromStoreAndTryAgain()}
                    />
                </Tooltip>
                {
                    props.procedureId ?
                        (
                            // we have both the image and the procedure, so we can just link them
                            <AttachImageButton imageId={props.imageId} procedureId={props.procedureId} />
                        ) : proceduresAvailable && proceduresAvailable.length > 0 ? (
                            <>
                            // we need to go and choose a procedure to link the image to
                                <IconButton
                                    icon={"format-list-bulleted-square"}
                                    onPress={() => navigation.navigate('ProcedureList', { imageId: props.imageId })}
                                />
                                <Tooltip title="Create new case">
                                    <IconButton
                                        icon="plus"
                                        mode="contained"
                                        onPress={() => createNewProcedureAndAssociateToImage()}
                                    />
                                </Tooltip>
                            </>
                        ) : (
                            <Tooltip title="Create new case">
                                <IconButton
                                    icon="plus"
                                    mode="contained"
                                    onPress={() => createNewProcedureAndAssociateToImage()}
                                />
                            </Tooltip>
                        )
                }
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    capturedImage: { ...Images.images.captured }
})

export default ImageCaptured;