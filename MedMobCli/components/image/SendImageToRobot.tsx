import { IconButton } from "react-native-paper";
import { useAppDispatch } from "../../hooks";
import { xraiImageUpdated } from "../../store/xraiImages";
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
        dispatch(xraiImageUpdated({ id: props.imageId, changes: { masks: dummyAttributes } }));
        navigation.navigate("ProcessedImage", { imageId: props.imageId, mode: 'orig' })
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