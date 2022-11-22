import { Platform, Pressable, StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";

export default function PressableBox({
    children,
    onPress,
    style: customStyle,
    ...args }) {

    return (
        <Pressable {...args}
            onPress={onPress}
            style={({ pressed }) => [globalStyles.basicContainer, styles.box, {
                backgroundColor: pressed ? styleVar.blueShadow : styleVar.white,
                top: pressed ? 2 : 0
            }, customStyle]}
            selectable={false}
            adjustsFontSizeToFit={true}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        width: Platform.OS === 'web' ? 300 : '100%',
        marginHorizontal: Platform.OS === 'web' ? 20 : 0,
        marginVertical: Platform.OS === 'web' ? 20 : 10,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        fontSize: styleVar.largeFontSize,
    }
});
