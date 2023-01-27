import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Modal, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import IconButton from "../IconButton";
import styleVar from "../../../styles/styleVar";
import { useRef, useState, cloneElement } from "react";
import globalStyles from "../../../styles/globalStyles";

export default function OptionsMenu({
    children,
    style: customStyle,
    containerStyle,
    buttonStyle
}) {
    const buttonRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const [pos, setPos] = useState({ x: '50%', y: '50%' });

    const { width } = useWindowDimensions();

    const clickOutsideHandler = () => {
        setVisible(false)
    }

    const buttonClickHandler = (e) => {
        setPos({
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        });

        setVisible(v => !v);
    }

    const xPos = (width > 1000) ? { left: pos.x } : { right: '5%' };
    return (
        <View style={[styles.container, containerStyle]} ref={buttonRef} >
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
                        { top: pos.y, ...xPos },
                        (width < 800) && styles.mobileMenu,
                            customStyle]}>
                            {children.map((child, i) => {
                                return cloneElement(child, { key: i, menuOnPress: clickOutsideHandler })
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
    },
    mobileMenu: {
        minWidth: 150,
        maxWidth: '95%'
    }
})