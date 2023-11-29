import { useColorScheme } from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/rootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../navigation/bottomTabParams";
import CaptureImage from "../../components/CaptureImage";
import ImageCaptured from "../../components/ImageCaptured";
import { Surface, Text } from "react-native-paper";
import { CaptureScreenNavProp } from "../navigation/screenNavProps";

type CaptureScreenProp = {

}

function CaptureScreen() {
  const navigation = useNavigation<CaptureScreenNavProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const camera = useRef<Camera>(null);
  // const devices = useCameraDevices();
  // console.log(devices);
  // const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  // useEffect(() => {
  //   async function getPermission() {
  //     const newCameraPermission = await Camera.requestCameraPermission();
  //     console.log("Camera permission: " + newCameraPermission);
  //   }
  //   getPermission();
  // }, []);

  // const capturePhoto = async () => {
  //   if (camera.current !== null) {
  //     const photo = await camera.current.takePhoto({});
  //     setImageSource(photo.path);
  //     setShowCamera(false);
  //     console.log(photo.path);
  //   }
  // };

  // if (device == null) {
  //   return <Text>Camera not available</Text>;
  // }
  return (
    <Surface
      elevation={2}
    >
      <Text variant='titleSmall'>IMAGE</Text>
      <CaptureImage show={showCamera} setShowCamera={setShowCamera} setImage={setImageSource} />
      <ImageCaptured imageSource={imageSource} show={!showCamera} setShowCamera={setShowCamera} />
    </Surface>
  );
}

export default CaptureScreen;