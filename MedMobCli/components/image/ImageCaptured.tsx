import { Card, IconButton, Tooltip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import AttachImageButton from "./AttachImageButton";
import { StyleSheet } from "react-native";
import { Images } from "../../styles";
import createNewProcedure from "../../store/createNewProcedure";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { procedureAdded, selectMaxCaseNumber } from "../../store/procedures";
import { xraiImageRemoved, xraiImageUpdated, selectXraiImageById } from "../../store/xraiImages";
import { useContext } from "react";
import showCameraContext from "../../context/showCameraContext";

type imageCapturedProp = {
    imageId: string,
    procedureId?: string
};

function ImageCaptured(props: imageCapturedProp) {
    const { setShowCamera } = useContext(showCameraContext);

    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const dispatch = useAppDispatch();
    const maxCaseNum = useAppSelector((state: RootState) => selectMaxCaseNumber(state));
    const image = useAppSelector((state: RootState) => selectXraiImageById(state, props.imageId));
    console.log("ImageCaptured::image?.id: " + image?.id)
    console.log("ImageCaptured::props.imageId: " + props.imageId)

    const createNewProcedureAndAssociateToImage = () => {
        // create and dispatch the new procedure
        const newProcedure = createNewProcedure(maxCaseNum + 1);
        dispatch(procedureAdded(newProcedure));

        // associate the image to the procedure
        dispatch(xraiImageUpdated({ id: props.imageId!, changes: { procedureId: newProcedure.id} }));

        // navigate to the procedure details screen
        navigation.navigate("ProcedureDetails", { procedureId: newProcedure.id });
    };

    const removeImageFromStoreAndTryAgain = () => {
        if (props.imageId) {
            dispatch(xraiImageRemoved(props.imageId));
            setShowCamera(true);
        }
    }

    return (
        <Card>
            <Card.Title title="Image Captured"></Card.Title>
            <Card.Cover
                source={{ uri: `file://${image?.rawImageSource}` }}
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