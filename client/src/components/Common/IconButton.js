import { StyleSheet, TouchableOpacity } from "react-native";

import styleVar from "../../styles/styleVar";

export default function IconButton({ Icon,
    onPress,
    size = styleVar.mediumIconSize,
    iconSize,
    color = styleVar.gray,
    style: buttonStyle,
    ...props
}) {
    return (
        <TouchableOpacity style={[styles.button, { width: 2 * size, height: 2 * size }, buttonStyle]}
            hitSlop={15}
            onPress={onPress}
            {...props}>
            <Icon
                size={iconSize || size}
                color={color} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 3,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
})