import { useContext, useEffect } from "react";
import { Card, IconButton, Tooltip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet } from "react-native";

import { Images } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { addProcedure, fetchProcedures, updateProcedure } from "../../store/procedures";
import { xraiImageRemoved, selectXraiImageById, updateImage } from "../../store/xraiImages";
import showCameraContext from "../../context/showCameraContext";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import AttachImageButton from "./AttachImageButton";
import { Procedure } from "../../domain/procedure";
import ProcedureCardCover from "../procedure/ProcedureCardCover";
import { getImagePathPrefix } from "../../domain/imageUtilityService";

type imageCapturedProp = {
    imageId: string,
    procedureId?: string
};

function ImageCaptured(props: imageCapturedProp) {
    const { setShowCamera } = useContext(showCameraContext);

    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const dispatch = useAppDispatch();
    const image = useAppSelector((state: RootState) => selectXraiImageById(state, props.imageId));
    console.log("ImageCaptured::props.imageId: " + props.imageId)
    console.log(`image raw source: ${image?.rawImageSource}`)
    useEffect(() => {
        dispatch(fetchProcedures());
    }, []);

    const createNewProcedureAndAssociateToImage = async () => {

        // create and dispatch the new procedure
        const newProcedure = {
            id: uuidv4(),
            patientName: '',
            urIdentifier: '',
            date: new Date().toISOString(),
            hospital: '',
            surgeon: '',

            surgeryType: '',

            indication: ''
        } as Procedure;

        try {
            // Explicitly type the dispatch result
            const resultAction = await dispatch(addProcedure(newProcedure));

            if (addProcedure.fulfilled.match(resultAction)) {
                const newProcedure = resultAction.payload;

                // Now that we have the new procedure, update the image
                await dispatch(updateImage({ id: props.imageId, changes: { procedureId: newProcedure.id } }));

                // and set the default image source on the procedure
                dispatch(updateProcedure({id: newProcedure.id, changes:{defaultImageSource: image?.rawImageSource}}))

                // Both actions have completed successfully
                console.log('Procedure created and image updated');
            } else {
                // Handle rejection
                console.error('Procedure creation failed:', resultAction.error);
            }
        } catch (err) {
            // Handle any errors
            console.error('An error occurred:', err);
        }

        // navigate to the procedure details screen
        navigation.navigate("ProcedureDetails", { procedureId: newProcedure.id });
    };

    const removeImageFromStoreAndTryAgain = () => {
        if (props.imageId) {
            dispatch(xraiImageRemoved(props.imageId));
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
                        ) : (
                            // we need to go and choose a procedure to link the image to
                            <IconButton
                                icon={"format-list-bulleted-square"}
                                onPress={() => navigation.navigate('ProcedureList', { imageId: props.imageId })}
                            />
                        )
                }
                <Tooltip title="Create new case">
                    <IconButton
                        icon="plus"
                        mode="contained"
                        onPress={() => createNewProcedureAndAssociateToImage()}
                    />
                </Tooltip>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    capturedImage: { ...Images.images.captured }
})

export default ImageCaptured;