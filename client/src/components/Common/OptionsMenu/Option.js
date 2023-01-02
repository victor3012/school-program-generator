import { StyleSheet, View } from "react-native";
import styleVar from "../../../styles/styleVar";

export default function Option({
    children,
    last = false,
    style: customStyle
}) {
    return (
        <View style={[
            styles.option,
            last && { borderBottomWidth: 0 },
            customStyle
        ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    option: {
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: styleVar.lightgray,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})