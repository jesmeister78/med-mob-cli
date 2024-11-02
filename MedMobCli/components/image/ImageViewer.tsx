import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Dimensions, ListRenderItem } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { maskVisibilityUpdated, fetchProcessedImage, selectXraiImageById, processImage } from '../../store/xraiImageSlice';
import { env } from '../../environment';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { Containers } from '../../styles';
import ClassMaskSection from './ClassMaskSection';
import ClassMask from '../../domain/classMask';

// Screen dimensions
const { height } = Dimensions.get('window');

type ImageListProp = {
    imageId: string,
    mode: string
}
const ImageViewer: React.FC<ImageListProp> = (props: ImageListProp) => {
    const img = useAppSelector((state: RootState) => selectXraiImageById(state, props.imageId));
    const { loading } = useAppSelector((state: RootState) => state.xraiImages);
    // the number of columns in the attribute list will be 2 if more than 5 class masks returned, otherwise 1
    const numColumns = img?.masks?.length ?? 0 > 5 ? 2 : 1;
    const dispatch = useAppDispatch();
    const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;
    useEffect(() => {
        // if we have not already processed this image we do it on screen load
        if (img && (!img.compositeImageSource || img.compositeImageSource === defaultImgPath))
            dispatch(processImage(img.id));
    }, []);

    // Toggle visibility of an image
    const toggleImageVisibility = (index: number) => {
        dispatch(maskVisibilityUpdated({ path: `${img?.id}.${index}` }))
    };

    return (
        img ?
            (
                <Surface style={styles.surface}>
                    <ActivityIndicator size="large" animating={loading} />
                    <View style={styles.imageContainer}>
                        {img.masks?.map((attr, index) => {
                            console.log(`attr ${index}: ${attr.url} colour: ${attr.colour}`)
                            return (
                                attr.show && (
                                    <Image
                                        style={styles.image}
                                        key={index}
                                        source={{
                                            uri: `${env.XRAI_API_HOST}/${attr.url}`,
                                        }}
                                    />
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
                                    scrollEnabled={true}
                                    data={img.masks}
                                    renderItem={({ item, index }) => (
                                        <ClassMaskSection
                                            classMask={item}
                                            index={index}
                                            toggleFunc={toggleImageVisibility}
                                        />
                                    )}
                                    keyExtractor={(item) => item.code}
                                    numColumns={1}
                                />
                            ) : (
                                <FlatList
                                    key={numColumns}
                                    style={styles.toggleContainer}
                                    scrollEnabled={true}
                                    data={img.masks}
                                    renderItem={({ item, index }) => {
                                        const isLastItem = index === (img?.masks?.length ?? 1) - 1;
                                        const isOddRow = (Math.floor(index / 2) + 1) % 2 === 0;
                                        return isLastItem && isOddRow ? (
                                            <>
                                                <ClassMaskSection
                                                    classMask={item}
                                                    index={index}
                                                    toggleFunc={toggleImageVisibility}
                                                />
                                                <View style={styles.emptyCell}></View>
                                            </>

                                        ) :
                                            (
                                                <ClassMaskSection
                                                    classMask={item}
                                                    index={index}
                                                    toggleFunc={toggleImageVisibility}
                                                />
                                            );
                                    }}
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
                </Surface>
            )
    );
};

const styles = StyleSheet.create({
    surface: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
        marginBottom: 10,
        height: '100%',
        width: '100%',

    },
    divider: { ...Containers.container.divider },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height / 2, // Top half of the screen  
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    toggleContainer: {
        flex: 1,
        marginTop: height / 2 - 50, // Push the list down to make room for the image
    },
    toggleWrapper: {
        margin: 0,
    },
    toggleButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    emptyCell: {
        flex: 1,
        // borderColor: 'red'
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