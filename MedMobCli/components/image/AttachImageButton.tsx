import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { v4 as uuidv4 } from 'uuid';

import { ProcedureScreenNavProp } from "../../screens/navigation/screenNavProps";
import { ProcedureScreenMode } from "../../screens/navigation/bottomTabParams";
import { useAppDispatch } from "../../hooks";
import { processedImageAdded } from "../../store/processedImages";
import { ProcessedImage } from "../../domain/processedImage";


type AttachImageProp = {
    imageSource: string,
    procedureId?: string
}

function AttachImageButton(props: AttachImageProp) {
    const navigation = useNavigation<ProcedureScreenNavProp>();
    const dispatch = useAppDispatch();

    const AddImageToProcedure = () => {
        if (props.procedureId) {
            const newImage: ProcessedImage = {
                id: uuidv4(),
                procedureId: props.procedureId,
                imageTimestamp: new Date().getUTCSeconds(),
                //imageData: Uint8Array // this is the rendered image BEFORE processing
                rawImageSource: props.imageSource,
                processedDate: new Date().toISOString(),
                processorVersion: 'string', // version of the ai model used to generate the processed image
            };

            dispatch(processedImageAdded(newImage));
        }
        navigation.navigate('Procedure', { imageSource: props.imageSource, procedureId: props.procedureId });
    };

    return (
        <Button
            icon="paperclip"
            mode="contained"
            onPress={() => AddImageToProcedure()}
        >
            Attach
        </Button>
    );

}

export default AttachImageButton;