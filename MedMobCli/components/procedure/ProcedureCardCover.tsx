import { Card } from "react-native-paper"
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectProcedureById } from "../../store/procedureSlice";
import { getImagePathPrefix } from "../../domain/imageUtilityService";
import Config from "react-native-config";


type ProcedureCardCoverProp = {
    procedureId: string
}

function ProcedureCardCover(props: ProcedureCardCoverProp) {

    const procedure = useAppSelector((state: RootState) => selectProcedureById(state, props.procedureId));
    const getDefaultImagePath = () => {
        return procedure?.defaultImageSource ? `${getImagePathPrefix(procedure.defaultImageSource)}${procedure?.defaultImageSource}`
        : `${Config.XRAI_API_HOST}/${Config.XRAI_API_DEFAULT_IMG}`;
    }
    const sourcePath = getDefaultImagePath();
    console.log(`default_img_src: ${sourcePath}`)

    // TODO: need to show more than just the first image
    return procedure && (

        <Card.Cover
            source={{ uri: sourcePath }}
        />
    )
}
export default ProcedureCardCover;