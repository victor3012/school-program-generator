import { StyleSheet, TouchableHighlight, View } from "react-native";
import styleVar from "../../../styles/styleVar";

export default function Option({
    children,
    last = false,
    style: customStyle,
    onPress,
    menuOnPress
}) {
    const pressHanlder = () => {
        if (menuOnPress) {
            menuOnPress();
        }

        if (onPress) {
            onPress();
        }
    }

    return (
        <TouchableHighlight underlayColor={styleVar.blueShadow} style={[
            styles.option,
            last && { borderBottomWidth: 0 },
            customStyle
        ]} onPress={pressHanlder}>
            <View style={styles.container}>
                {children}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    option: {
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: styleVar.lightgray,
        paddingHorizontal: 10,
        width: '100%'
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})