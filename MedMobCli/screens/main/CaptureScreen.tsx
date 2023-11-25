import { View, TouchableOpacity, Image, Text, useColorScheme } from "react-native";
import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
import styles from "../../styles";
import { useRef, useState, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/rootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../navigation/mainBottomTabParams";
import CaptureImage from "../../components/CaptureImage";
import ImageCaptured from "../../components/ImageCaptured";

type CaptureScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Capture'>
>;

function CaptureScreen() {
  const navigation = useNavigation<CaptureScreenProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  console.log(devices);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log("Camera permission: " + newCameraPermission);
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }
  return <View style={styles.container}>
    <CaptureImage show={showCamera} setVisible={setShowCamera} setImage={setImageSource} />
    <ImageCaptured imageSource={imageSource} show={!showCamera} setVisible={setShowCamera} />
  </View>
}

export default CaptureScreen;