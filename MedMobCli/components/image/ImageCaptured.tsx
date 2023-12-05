import { Button, Card } from "react-native-paper";
import { GetImageProp } from "../props/getImageProps";
import { useNavigation } from "@react-navigation/native";
import { ProcedureScreenNavProp } from "../../screens/navigation/screenNavProps";
import { ProcedureScreenMode } from "../../screens/navigation/bottomTabParams";
import AttachImageButton from "./AttachImageButton";

type imageCapturedProp = {
    imageSource: string,
    procedureId?: string
} & GetImageProp;

function ImageCaptured(props: imageCapturedProp) {
    const navigation = useNavigation<ProcedureScreenNavProp>();
    // const attachImage = () => {
    //     if (props.procedureId) {
    //         const mode = props.procedureId ? ProcedureScreenMode.EDIT : ProcedureScreenMode.LIST;
    //         navigation.navigate("Procedure", { mode: mode })
    //     }
    // }

    if (props.imageSource !== '') {
        const imagePath = `file://${props.imageSource}`;
        return (
            <Card>
                <Card.Title title="Process Image"></Card.Title>
                <Card.Cover source={{ uri: imagePath }} />
                <Card.Actions>
                    <Button
                        icon="camera"
                        mode="contained"
                        onPress={() => props.setShowCamera(true)}
                    >
                        Try Again
                    </Button>
                    <AttachImageButton imageSource={props.imageSource} procedureId={props.procedureId} />
                    <Button
                        icon="plus"
                        mode="contained"
                        onPress={() => props.setShowCamera(true)}
                    >
                        New Case
                    </Button>
                </Card.Actions>
            </Card>
        );
    }

}

export default ImageCaptured;