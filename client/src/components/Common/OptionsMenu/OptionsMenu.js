import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Modal, TouchableHighlight, Pressable, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import IconButton from "../IconButton";
import styleVar from "../../../styles/styleVar";
import React, { useRef, useState, useEffect } from "react";
import globalStyles from "../../../styles/globalStyles";
import { Dimensions } from "react-native";


export default function OptionsMenu({
    children,
    style: customStyle,
    containerStyle,
    buttonStyle
}) {
    const buttonRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const [pos, setPos] = useState({ x: '50%', y: '50%' });

    const { width, height } = useWindowDimensions();


    useEffect(() => {
        if (!(buttonRef?.current)) {
            return;
        }

        buttonRef.current.measureInWindow((x, y, buttonWidth) => {
            setPos({
                x: x + buttonWidth,
                y: y - (buttonRef.current?.offsetTop || 0)
            });
        });

    }, [buttonRef, width, height])

    const clickOutsideHandler = () => {
        setVisible(false)
    }

    const buttonClickHandler = () => {
        setVisible(v => !v);
    }

    const xPos = (width > 1000) ? { left: pos.x } : { right: '2.5%' };
    return (
        <View style={[styles.container, containerStyle]} ref={buttonRef}>
            <IconButton
                Icon={() => <Icon
                    size={styleVar.largeIconSize}
                    color={styleVar.gray}
                    name='dots-three-horizontal' />}
                style={[styles.button, buttonStyle]}
                onPress={buttonClickHandler}
            />

            <Modal transparent={true} visible={visible} animationType='none'>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={clickOutsideHandler}
                    style={styles.transparentContainer}>
                    <TouchableWithoutFeedback>
                        <View style={[globalStyles.basicContainer, styles.menu,
                        { top: pos.y }, xPos, customStyle]}>
                            {children.map((child, i) => {
                                return React.cloneElement(child, { key: i, menuOnPress: clickOutsideHandler })
                            })}
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center'
    },
    transparentContainer: {
        zIndex: 4,
        flex: 1,
        backgroundColor: 'transparent',
        cursor: 'default'
    },
    button: {
        borderRadius: styleVar.largeIconSize,
    },
    menu: {
        zIndex: 5,
        margin: 0,
        padding: 0,
        position: 'absolute',
        minWidth: 200,
        borderWidth: 1.5,
        borderColor: styleVar.gray,
        borderRadius: 3,
    }
})