import { ScrollView, StyleSheet, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";

export default function Form({ children, style, borderTopColor = styleVar.blueShadow, ...args }) {
    return (
        <View style={styles.container}>
            <ScrollView {...args} contentContainerStyle={[globalStyles.basicContainer, styles.form, { borderTopColor }, style]}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex:1
    },
    form: { // basic container required
        borderTopColor: styleVar.blueShadow,
        borderTopWidth: 5,
        paddingTop: 10
    }
})