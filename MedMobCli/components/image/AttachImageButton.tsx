import { useNavigation } from "@react-navigation/native";
import { IconButton, Tooltip } from "react-native-paper";

import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";
import { useAppDispatch } from "../../hooks";
import { processedImageUpdated } from "../../store/processedImages";
import { Dispatch, SetStateAction } from "react";


type AttachImageProp = {
    imageId: string,
    procedureId: string
}

function AttachImageButton(props: AttachImageProp) {

    console.log("AttachImageButton::props.procedureId: " + props.procedureId);
    console.log("AttachImageButton::props.imageId: " + props.imageId);
    const navigation = useNavigation<ProcedureListScreenNavProp>();
    const dispatch = useAppDispatch();

    const AssociateImageToProcedure = () => {

        dispatch(processedImageUpdated({ id: props.imageId, changes: { procedureId: props.procedureId } }));
        navigation.navigate('ProcedureDetails', { procedureId: props.procedureId })
    };

    return (
        <Tooltip title="Attach to case">
            <IconButton
                icon="paperclip"
                mode="contained"
                onPress={() => AssociateImageToProcedure()}
            />
        </Tooltip>
    );

}

export default AttachImageButton;