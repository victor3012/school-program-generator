import { Dimensions, StyleSheet, Text, useWindowDimensions, View, TouchableWithoutFeedback, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import IconButton from "../IconButton";
import styleVar from "../../../styles/styleVar";
import { useRef, useState, forwardRef, useEffect } from "react";
import globalStyles from "../../../styles/globalStyles";


export default function OptionsMenu({
    children,
    style: customStyle,
    containerStyle,
    buttonStyle
}) {
    const buttonRef = useRef(null);
    const iconRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const [visible, setVisible] = useState(false);

    const [pos, setPos] = useState({ x: '50%', y: '50%' });

    useEffect(() => {
        if (!buttonRef.current) {
            return;
        }

        buttonRef.current.measureInWindow((x, y, width) => {
            console.log('offtop', buttonRef.current.offsetTop);
            console.log('y', y);
            setPos({
                x: x + width,
                y: y - buttonRef.current.offsetTop
            });
        });

    }, [buttonRef])

    const clickOutsideHandler = () => {
        setVisible(false)
    }

    const buttonClickHandler = () => {
        setVisible(v => !v);
    }

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
                        <View style={[globalStyles.basicContainer, styles.menu, {
                            top: pos.y,
                            left: pos.x
                        }, customStyle]}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
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