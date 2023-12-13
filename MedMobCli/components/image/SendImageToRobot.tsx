import { IconButton } from "react-native-paper";
import { useAppDispatch } from "../../hooks";
import { ProcessedImage } from "../../domain/processedImage";
import { processedImageUpdated } from "../../store/processedImages";
import ImageAttribute from "../../domain/imageAttribute";
import { dummyAttributes } from "../../store/dummyInitState";
import { useNavigation } from "@react-navigation/native";
import { ProcedureListScreenNavProp } from "../../screens/navigation/screenNavProps";

type SendImageToRobotProp = {
    imageId: string,
}

function SendImageToRobot(props: SendImageToRobotProp) {
    const navigation = useNavigation<ProcedureListScreenNavProp>();

    const dispatch = useAppDispatch();
    const sendImageToRobot = () => {
        dispatch(processedImageUpdated({ id: props.imageId, changes: { attributes: dummyAttributes } }));
        navigation.navigate("ProcessedImage", { imageId: props.imageId })
    };

    return (
        props.imageId ? (
            <IconButton
                icon={"robot"}
                mode="contained"
                onPress={() => sendImageToRobot()} />
        ) : (null)
    );

}

export default SendImageToRobot;