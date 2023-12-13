import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProcessedImageScreenNavProp, ProcessedImageScreenRouteProp } from '../navigation/screenNavProps';
import ImageWithAttributes from '../../components/image/ImageWithAttributes';
import { SafeAreaView } from 'react-native-safe-area-context';


function ProcessedImageScreen({ route }: ProcessedImageScreenRouteProp) {
    const navigation = useNavigation<ProcessedImageScreenNavProp>();
    const imageId = route.params.imageId;
    console.log("ProcessedImageScreen::route.params.procedureId: " + imageId)

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ImageWithAttributes imageId={imageId} />
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ProcessedImageScreen;