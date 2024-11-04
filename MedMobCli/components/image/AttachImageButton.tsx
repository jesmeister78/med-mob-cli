import { useNavigation } from "@react-navigation/native";
import { IconButton, MD3Colors, Tooltip } from "react-native-paper";

import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Dispatch, SetStateAction } from "react";
import { selectXraiImageById, xraiImageUpdated } from "../../store/xraiImageSlice";
import { imageService } from "../../services/imageService";
import { procedureUpdated } from "../../store/procedureSlice";
import { RootState } from "../../store";
import { setError } from "../../store/errorSlice";


type AttachImageProp = {
    imageId: string,
    procedureId: string
}

function AttachImageButton(props: AttachImageProp) {

    console.log("AttachImageButton::props.procedureId: " + props.procedureId);
    console.log("AttachImageButton::props.imageId: " + props.imageId);
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const dispatch = useAppDispatch();
    const image = useAppSelector((state: RootState) => selectXraiImageById(state, props.imageId));


    const AssociateImageToProcedure = () => {
        // update the store
        if (image) {
            dispatch(xraiImageUpdated({ id: props.imageId, changes: { procedureId: props.procedureId } }));
            dispatch(procedureUpdated({ id: props.procedureId, changes: { defaultImageSource: image?.rawImageSource } }));
            // update the proc id and the default img src in the database
            imageService.updateImageAsync({ id: props.imageId, changes: { procedureId: props.procedureId } })
            navigation.navigate('ProcedureDetails', { procedureId: props.procedureId })
        } else {
            dispatch(setError(`Can not find image ${props.imageId}`));
        }
    };

    return (
        <Tooltip title="Attach to case">
            <IconButton
                icon="paperclip"
                mode="contained"
                iconColor={MD3Colors.tertiary70}
                onPress={() => AssociateImageToProcedure()}
            />
        </Tooltip>
    );

}

export default AttachImageButton;