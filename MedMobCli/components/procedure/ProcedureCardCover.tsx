import { Card } from "react-native-paper"
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcessedImagesByProcedureId } from "../../store/processedImages";


type ProcedureCardCoverProp = {
    procedureId: string
    addImageSource?: string
}

function ProcedureCardCover(props: ProcedureCardCoverProp) {

    const procedureImages = useAppSelector((state: RootState) => selectProcessedImagesByProcedureId(state, props.procedureId));

            // TODO: need to show more than just the first image
    return procedureImages && procedureImages.length > 0 ? (
                <Card.Cover
                    source={{ uri: `file:///${procedureImages[procedureImages.length-1].rawImageSource}` }}
                />
            ) : (null)
        // );
}

export default ProcedureCardCover;