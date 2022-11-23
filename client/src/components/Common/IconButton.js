import { StyleSheet, TouchableOpacity } from "react-native";

import styleVar from "../../styles/styleVar";

export default function IconButton({ Icon,
    onPress,
    size = styleVar.mediumIconSize,
    color = styleVar.gray,
    style: buttonStyle,
}) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]}
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
        height: 40,
        width: 2 * styleVar.mediumIconSize,
        paddingRight: 3,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
})