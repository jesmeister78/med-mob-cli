import { StyleSheet, useColorScheme } from "react-native";
import { useContext, useState } from "react";
import CaptureImage from "../../components/image/CaptureImage";
import ImageCaptured from "../../components/image/ImageCaptured";
import { Surface } from "react-native-paper";
import { CaptureScreenRouteProp } from "../navigation/screenNavProps";
import { Containers } from "../../styles";
import showCameraContext from "../../context/showCameraContext";
import ErrorComponent from "../../components/Error";


function CaptureScreen({ route }: CaptureScreenRouteProp) {
  const { showCamera } = useContext(showCameraContext);

  console.log("CaptureScreen::showCamera: " + showCamera)
  const [imageId, setImageId] = useState('');

  return (
      <Surface
        style={styles.surface}
      >
        <ErrorComponent/>
        {
          showCamera ?
            (
              <CaptureImage setImage={setImageId} />
            ) : (
              <ImageCaptured imageId={imageId} procedureId={route.params?.procedureId} />
            )
        }
      </Surface>
  );
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default CaptureScreen;