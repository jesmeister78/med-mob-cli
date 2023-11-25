import { Button, Card } from "react-native-paper";
import { GetImageProp } from "./props/getImageProps";

type imageCapturedProp = {
    imageSource: string
} & GetImageProp;

function ImageCaptured(props: imageCapturedProp) {
    if (props.imageSource !== '') {
        return (
            <Card>
                <Card.Title title="Process Image"></Card.Title>
                <Card.Cover source={{ uri: `file://${props.imageSource}` }} />
                <Card.Actions>
                    <Button icon="camera" mode="contained" onPress={() => props.setVisible(true)}>
                        Try Again
                    </Button>
                    <Button icon="paperclip" mode="contained" onPress={() => props.setVisible(true)}>
                        Attach
                    </Button>
                    <Button icon="plus" mode="contained" onPress={() => props.setVisible(true)}>
                        New Case
                    </Button>
                </Card.Actions>
            </Card>
        );
    }
    
}

export default ImageCaptured;