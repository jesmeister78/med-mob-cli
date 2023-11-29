import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { GetImageProp } from "./props/getImageProps";

function ImageSelectFromFile(props: GetImageProp){
    const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        
      });
      setFileResponse(response);

      // close the component
      props.setShowCamera(false);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        props.setShowCamera(false);
      } else {
        console.error(err)
      }
    }
  }, []);


  if(!props.show){
     return <View />;
  }else{
    handleDocumentSelection();

    return (
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle={'dark-content'} />
        {fileResponse.map((file, index) => (
          <Text
            key={index.toString()}
            //style={styles.uri}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {file?.uri}
          </Text>
        ))}
      </SafeAreaView>
    );
  }

 
}

export default ImageSelectFromFile;