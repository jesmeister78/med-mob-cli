import { Button, Card } from "react-native-paper";
import { GetImageProp } from "./props/getImageProps";
import { useNavigation } from "@react-navigation/native";
import { ProcedureScreenNavProp } from "../screens/navigation/screenNavProps";
import { ProcedureScreenMode } from "../screens/navigation/bottomTabParams";

type imageCapturedProp = {
    imageSource: string
} & GetImageProp;

function ImageCaptured(props: imageCapturedProp) {
    const navigation = useNavigation<ProcedureScreenNavProp>();
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
                    <Button
                        icon="paperclip"
                        mode="contained"
                        onPress={() => navigation.navigate('Procedure', { imageSource: imagePath, mode: ProcedureScreenMode.LIST })}
                    >
                        Attach
                    </Button>
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