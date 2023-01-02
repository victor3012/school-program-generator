import { StyleSheet, TouchableOpacity } from "react-native";

import styleVar from "../../styles/styleVar";

export default function IconButton({ Icon,
    onPress,
    size = styleVar.mediumIconSize,
    color = styleVar.gray,
    style: buttonStyle,
}) {
    return (
        <TouchableOpacity style={[styles.button, { width: 2 * size, height: 2 * size }, buttonStyle]}
            hitSlop={15}
            onPress={onPress}>
            <Icon
                size={size}
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