import { StyleSheet, View, Text, Platform } from "react-native"
import styleVar from "../styles/styleVar"

export default function Avatar({ size, firstName, lastName }) {
    return (
        <View
            style={[
                styles.avatar, {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }]}>
            <Text selectable={false} style={styles.avatarText}>
                {firstName[0].toLocaleUpperCase()}{lastName[0].toLocaleUpperCase()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: 'rgb(189, 221, 255)',
        alignContent: 'center',
        justifyContent: 'center',
        shadowColor: styleVar.black,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    avatarText: {
        color: styleVar.darkBlue,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: "center",
        textAlignVertical: 'center',
        width: '100%'
    },
})