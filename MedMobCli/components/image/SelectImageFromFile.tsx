import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type ImageSelectFromFileProp = {
  setShow: Dispatch<SetStateAction<boolean>>
  setImage?: (imgSource: string) => void
  show: boolean
}

function ImageSelectFromFile(props: ImageSelectFromFileProp) {
  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images], // Only allow image selection
      });
      
      setFileResponse(response);
      
      // Pass the selected image URI to parent component
      if (response.length > 0 && props.setImage) {
        console.log('In handleDocumentSelection() - Selected image URI:', response[0].uri);
        props.setImage(response[0].uri);
      }
      
      // Close the component
      props.setShow(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        props.setShow(false);
      } else {
        console.error('Document picker error:', err);
        props.setShow(false);
      }
    }
  }, [props]);

  // Use useEffect to trigger the picker when component mounts and show is true
  useEffect(() => {
    if (props.show) {
      handleDocumentSelection();
    }
  }, [props.show, handleDocumentSelection]);

  // Don't render anything if not showing
  if (!props.show) {
    return null;
  }

  // Optional: Show selected files (though usually you'd close immediately after selection)
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
    </SafeAreaView>
  );
}

export default ImageSelectFromFile;