import { StyleSheet, useColorScheme } from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import CaptureImage from "../../components/image/CaptureImage";
import ImageCaptured from "../../components/image/ImageCaptured";
import { Surface } from "react-native-paper";
import { CaptureScreenNavProp, CaptureScreenRouteProp } from "../navigation/screenNavProps";
import { Containers } from "../../styles";

type CaptureScreenProp = {

}

function CaptureScreen({ route }: CaptureScreenRouteProp) {

  console.log("CaptureScreen::route.params.showCamera: " + route.params.showCamera)

  const navigation = useNavigation<CaptureScreenNavProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showCamera, setShowCamera] = useState(route.params.showCamera);
  console.log("CaptureScreen::showCamera: " + showCamera)

  const [imageSource, setImageSource] = useState('');

  return (
    <Surface
      style={styles.surface}
    >
      {
        showCamera ? 
        (
          <CaptureImage setShowCamera={setShowCamera} setImage={setImageSource} />
        ) : (
          <ImageCaptured imageSource={imageSource} setShowCamera={setShowCamera} procedureId={route.params?.procedureId} />
        )
      }
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default CaptureScreen;