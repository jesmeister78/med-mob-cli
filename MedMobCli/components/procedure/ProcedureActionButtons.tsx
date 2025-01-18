import React, { useContext, useState, useCallback } from 'react';
import { Card, IconButton, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../hooks';
import ImageSelectFromFile from '../image/SelectImageFromFile';
import { ProcedureListScreenNavProp } from '../../screens/navigation/screenNavProps';
import AttachImageButton from '../image/AttachImageButton';
import showCameraContext from '../../context/showCameraContext';
import { imageUpdated } from '../../store/imageSlice';
import { imageService } from '../../services/imageService';
import { Procedure } from '../../domain/procedure';
import ProcedurePdfButton from './ProcedurePdfButton';
import { RootState } from '../../store';
import { selectProcedureById } from '../../store/procedureSlice';

type ProcedureActionProps = {
  addImageId?: string;
  procedureId: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
};

const ProcedureActionButtons = (props: ProcedureActionProps) => {
  const { setShowCamera } = useContext(showCameraContext);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProcedureListScreenNavProp>();
  const procedure = useAppSelector((state: RootState) =>
    selectProcedureById(state, props.procedureId),
  );

  const [selectImageFromFile, setSelectImageFromFile] = useState(false);

  const associateProcedureToImage = useCallback(() => {
    dispatch(
      imageUpdated({
        id: props.procedureId,
        changes: { procedureId: props.procedureId },
      }),
    );
    navigation.navigate('ProcedureDetails', { procedureId: props.procedureId });
  }, [dispatch, props.procedureId, navigation]);

  const captureNewImage = useCallback(() => {
    setShowCamera(true);
    navigation.navigate('Capture', {
      procedureId: props.procedureId,
      showCamera: true,
    });
  }, [setShowCamera, navigation, props.procedureId]);

  const handleFolderPress = useCallback(() => {
    setSelectImageFromFile(true);
  }, []);

  const handlePdfSuccess = useCallback((path: string) => {
    console.log('PDF generated at:', path);
    props.onSuccess?.(path);
  }, [props.onSuccess]);

  const handlePdfError = useCallback((error: Error) => {
    console.error('Failed to generate PDF:', error);
    props.onError?.(error);
  }, [props.onError]);

  if (!procedure) {
    return null;
  }

  // Render the image source selection buttons
  if (!props.addImageId) {
    return (
      <Card.Actions>
        <IconButton
          icon="folder"
          mode="contained"
          iconColor={MD3Colors.tertiary70}
          onPress={handleFolderPress}
        />

        <ImageSelectFromFile
          show={selectImageFromFile}
          setShow={setSelectImageFromFile}
          setImage={associateProcedureToImage}
        />

        <IconButton
          icon="camera"
          mode="contained"
          iconColor={MD3Colors.tertiary70}
          onPress={captureNewImage}
        />

        <ProcedurePdfButton
          procedureId={procedure.id}
          onSuccess={handlePdfSuccess}
          onError={handlePdfError}
        />
      </Card.Actions>
    );
  }

  // Render the attach image button
  return (
    <Card.Actions>
      <AttachImageButton
        procedureId={procedure.id}
        imageId={props.addImageId}
      />
    </Card.Actions>
  );
};

export default ProcedureActionButtons;