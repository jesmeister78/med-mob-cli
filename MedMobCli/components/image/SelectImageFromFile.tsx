import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { StatusBar, View } from "react-native";

import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type ImageSelectFromFileProp = {
    setShow: Dispatch<SetStateAction<boolean>>
    setImage?: (imgSource: string) => void
    show: boolean
}

function ImageSelectFromFile(props: ImageSelectFromFileProp){
    const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        
      });
      setFileResponse(response);

      // close the component
      props.setShow(false);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        props.setShow(false);
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
      <SafeAreaView>
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