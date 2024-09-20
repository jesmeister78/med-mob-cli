import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { attributeVisibilityUpdated, fetchProcessedImages, selectProcessedImageById } from '../../store/processedImages';
import { env } from '../../environment';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { Containers } from '../../styles';
import ImageAttributeSection from './ImageAttributeSection';

// Screen dimensions
const { height } = Dimensions.get('window');

type ImageListProp = {
    imageId: string,
    mode: string
}
const ImageViewer: React.FC<ImageListProp> = (props: ImageListProp) => {
    const img = useAppSelector((state: RootState) => selectProcessedImageById(state, props.imageId));
    const { loading } = useAppSelector((state: RootState) => state.processedImages);
    // the number of columns in the attribute list will be 2 if more than 5 class masks returned, otherwise 1
    const numColumns = img?.attributes?.length ?? 0 > 5 ? 2 : 1;
    const dispatch = useAppDispatch();
    const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;

    useEffect(() => {
        console.log('ImageWithAttributes::img.compositeImageSource = ' + img!.compositeImageSource)
        console.log('ImageWithAttributes::env.XRAI_API_DEFAULT_IMG = ' + env.XRAI_API_DEFAULT_IMG)
        // if we have not already processed this image we do it on screen load
        if (img && (!img.compositeImageSource || img.compositeImageSource === defaultImgPath))
            dispatch(fetchProcessedImages(img));
    }, []);

    // Toggle visibility of an image
    const toggleImageVisibility = (index: number) => {
        dispatch(attributeVisibilityUpdated({path:`${img?.id}.${index}`}))
    };

    return (
        img ? (
            <Surface style={styles.surface}>
                <ActivityIndicator size="large" animating={loading} />
                <View style={styles.imageContainer}>
                    {img.attributes?.map((attr, index) => {
                        console.log(`attr ${index}: ${attr.url} colour: ${attr.colour}`)
                        return (
                            attr.show && (
                                <Image key={index} source={{
                                    uri: `${env.XRAI_API_HOST}/${attr.url}`,
                                }} style={styles.image} />
                            )
                        );
                    })}
                </View>
                {
                    // we need to do it like this because a flatlist cannot handle the number of columns changing after it has been rendered
                    numColumns === 1 ?
                        (
                            <FlatList
                                key={numColumns}
                                style={styles.toggleContainer}
                                scrollEnabled={false}
                                data={img.attributes}
                                renderItem={({ item, index }) => (
                                    <ImageAttributeSection imageAttribute={item} index={index} toggleFunc={toggleImageVisibility} />
                                )}
                                keyExtractor={(item) => item.code}
                                numColumns={1}
                            />
                        ) : (
                            <FlatList
                                key={numColumns}
                                style={styles.toggleContainer}
                                scrollEnabled={false}
                                data={img.attributes}
                                renderItem={({ item, index }) => (
                                    <ImageAttributeSection imageAttribute={item} index={index} toggleFunc={toggleImageVisibility} />
                                )}
                                keyExtractor={(item) => item.code}
                                numColumns={2}
                            />
                        )
                }

            </Surface>
        ) : (
            <Surface style={styles.notFound}>
                <Text>
                    Image not found.
                </Text>
            </Surface>)
    );
};

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface, width: '100%' },
    divider: { ...Containers.container.divider },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height / 2, // Top half of the screen  
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 350,
        height: 350,
        position: 'absolute',
    },
    toggleContainer: {
        flex: 1,
        marginTop: height / 2, // Push the list down to make room for the image
    },
    toggleWrapper: {
        margin: 0,
    },
    toggleButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },

    activeToggle: {
        backgroundColor: '#aaa',
    },
    toggleText: {
        fontSize: 12,
        color: '#000',
    },
    columnWrapper: {
        justifyContent: 'space-between', // Optional: space items evenly in columns
    },
    notFound: { ...Containers.container.outerSurface, marginTop: 15, width: '100%', height: '100%', justifyContent: 'center' },
});

export default ImageViewer;