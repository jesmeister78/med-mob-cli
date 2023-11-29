import { Card } from "react-native-paper"


type ProcedureImageProp = {
    imageSource?: string
}

function ProcedureImage(props: ProcedureImageProp) {
    return props.imageSource ?
        (
            <Card.Cover
                source={{ uri: props.imageSource }}
            />
        ) : (null);
}

export default ProcedureImage;