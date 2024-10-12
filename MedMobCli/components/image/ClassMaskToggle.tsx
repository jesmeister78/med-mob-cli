import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Containers } from "../../styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ClassMaskToggleProp = {
    show: boolean,
    index: number,
    toggleFunc: (index: number) => void,
    colour: string
}

function ClassMaskToggle(props: ClassMaskToggleProp) {

    const [visible, setVisible] = useState(props.show);

    const changeToggle = () => {
        setVisible(!visible);
        props.toggleFunc(props.index);
    }
    return (
        <View key={props.index} style={styles.cell}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => changeToggle()} style={styles.button}>
                    <Icon
                        name={visible ? 'eye' : 'eye-off'}
                        size={30}
                        color={props.colour}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonRow: {},
    row: { ...Containers.container.row },
    cell: { ...Containers.container.cell },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 50,
    },
    button: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
    },
});
export default ClassMaskToggle;