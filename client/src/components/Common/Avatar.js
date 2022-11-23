import { StyleSheet, View, Text } from "react-native"
import styleVar from "../../styles/styleVar"

export default function Avatar({ size, firstName, lastName, style: customStyle }) {
    return (
        <View
            style={[
                styles.avatar, {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }, customStyle]}>
            <Text selectable={false} style={[styles.avatarText, { fontSize: size / 2.5 }]}>
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
        fontWeight: 'bold',
        textAlign: "center",
        textAlignVertical: 'center',
        width: '100%'
    },
})