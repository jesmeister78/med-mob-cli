import React, { useContext, useState, useCallback } from 'react';
import { Card, IconButton, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import ImageSelectFromFile from '../image/SelectImageFromFile';
import { ProcedureListScreenNavProp } from '../../screens/navigation/screenNavProps';
import AttachImageButton from '../image/AttachImageButton';
import showCameraContext from '../../context/showCameraContext';
import { addImage } from '../../store/imageSlice';
import ProcedurePdfButton from './ProcedurePdfButton';
import { RootState } from '../../store';
import { selectProcedureById } from '../../store/procedureSlice';
import { Image } from '../../domain/image';

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

    const handleImageSelected = useCallback(async (imageUri: string) => {
        try {
            // Create a new image entry with the selected file
            const now = new Date().toISOString();
            const imageId = uuidv4();
            console.log('In handleImageSelected: PROCEDUREID', props.procedureId);
            // create and dispatch the new image
            const img = {
                id: imageId,
                imageTimestamp: now,
                rawImageSource: imageUri,
                compositeImageSource: '',
                labelsImageSource: '',
                procedureId: props.procedureId,
            } as Image;

            // Add the image to the store
            dispatch(addImage(img));

            // Navigate to procedure details
            navigation.navigate('ProcedureDetails', { procedureId: props.procedureId });
        } catch (error) {
            console.error('Failed to add image:', error);
            props.onError?.(error as Error);
        }
    }, [dispatch, props.procedureId, navigation, props.onError]);

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

    // Render the buttons for adding images and generating PDF
    if (!props.addImageId) {
        return (
            <>
                <Card.Actions>
                    <IconButton
                        icon="folder"
                        mode="contained"
                        iconColor={MD3Colors.tertiary70}
                        onPress={handleFolderPress}
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

                {/* Move ImageSelectFromFile outside of Card.Actions to prevent re-renders */}
                <ImageSelectFromFile
                    show={selectImageFromFile}
                    setShow={setSelectImageFromFile}
                    setImage={handleImageSelected}
                />
            </>
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