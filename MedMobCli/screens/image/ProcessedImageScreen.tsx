import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProcessedImageScreenNavProp, ProcessedImageScreenRouteProp } from '../navigation/screenNavProps';
import ImageList from '../../components/image/ImageList';


function ProcessedImageScreen({ route }: ProcessedImageScreenRouteProp) {
    const navigation = useNavigation<ProcessedImageScreenNavProp>();
    const procedureId = route.params.procedureId;
    console.log("ProcessedImageScreen::route.params.procedureId: " + procedureId)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ImageList procedureId={procedureId} />
        </View>
    );
}

export default ProcessedImageScreen;