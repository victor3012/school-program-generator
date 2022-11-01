import { StyleSheet, TouchableOpacity } from "react-native";

import styleVar from "../styles/styleVar";

export default function InputIconButton({ Icon,
    onPress,
    size = styleVar.mediumIconSize,
    color = styleVar.gray
}) {
    return (
        <TouchableOpacity style={styles.button}
            hitSlop={15}
            onPress={onPress}>
            <Icon size={size}
                color={color} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        top: 38,
        right: 0,
        width: 2 * styleVar.mediumIconSize,
        paddingRight: 3,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
})