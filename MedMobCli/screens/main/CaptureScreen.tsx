import { useColorScheme } from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/rootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../navigation/bottomTabParams";
import CaptureImage from "../../components/image/CaptureImage";
import ImageCaptured from "../../components/image/ImageCaptured";
import { Surface, Text } from "react-native-paper";
import { CaptureScreenNavProp, CaptureScreenRouteProp } from "../navigation/screenNavProps";

type CaptureScreenProp = {

}

function CaptureScreen({ route }: CaptureScreenRouteProp) {
  const navigation = useNavigation<CaptureScreenNavProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  return (
    <Surface
      elevation={2}
    >
      <Text variant='titleSmall'>IMAGE</Text>
      <CaptureImage show={showCamera} setShowCamera={setShowCamera} setImage={setImageSource} />
      <ImageCaptured imageSource={imageSource} show={!showCamera} setShowCamera={setShowCamera} procedureId={route.params?.procedureId} />
    </Surface>
  );
}

export default CaptureScreen;