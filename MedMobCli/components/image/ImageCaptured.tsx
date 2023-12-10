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
   
    if (props.imageSource) {
        return (
            <Card>
                <Card.Title title="Process Image"></Card.Title>
                <Card.Cover source={{ uri: `file://${props.imageSource}` }} />
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