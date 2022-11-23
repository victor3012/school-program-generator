import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

export default function OpacityButton({
    children,
    onPress,
    disabled,
    style: additionalStyles = {},
    textStyle: additionalTextStyles = {},
    ...props }) {
    return (
        <TouchableOpacity hitSlop={10}
            style={[styles.button, additionalStyles, disabled ? { backgroundColor: 'grey' } : {}]}
            onPress={onPress}
            disabled={disabled}
            {...props}>
            {typeof (children) === 'string'
                ? <Text style={[globalStyles.text, styles.text, additionalTextStyles]}>
                    {children}
                </Text>
                : children
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: styleVar.blue,
        marginVertical: 20,
        userSelect: 'none'
    },
    text: {
        fontWeight: 'bold',
        color: styleVar.white
    }
})