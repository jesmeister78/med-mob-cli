import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProcessedImageScreenNavProp, ProcessedImageScreenRouteProp } from '../navigation/screenNavProps';
// import ImageWithAttributes from '../../components/image/ImageWithAttributes';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from '../../components/image/ImageViewer';


function ProcessedImageScreen({ route }: ProcessedImageScreenRouteProp) {
    const navigation = useNavigation<ProcessedImageScreenNavProp>();
    const imageId = route.params.imageId;
    const mode = route.params.mode;
    console.log("ProcessedImageScreen::route.params.procedureId: " + imageId)
    console.log("ProcessedImageScreen::route.params.mode: " + mode)

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <ImageWithAttributes imageId={imageId} mode={mode} /> */}
                    <ImageViewer imageId={imageId} mode={mode}/>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ProcessedImageScreen;