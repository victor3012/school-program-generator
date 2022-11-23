import { View, Animated, StyleSheet, Text, Platform } from "react-native";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";
import Avatar from "./Common/Avatar";

export default function ProfileOverview({ user }) {
    return (
        <View style={styles.container}>
            <Animated.View style={styles.avatarContainer}>
                <Avatar size={130} firstName={user.firstName} lastName={user.lastName} />
            </Animated.View>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={[globalStyles.text, styles.text, styles.name]}>
                    {`${user.firstName} ${user.lastName}`}
                </Text>
                <Text numberOfLines={1} style={[globalStyles.text, styles.text]}>
                    {user.email}
                </Text>
                <Text numberOfLines={1} style={[globalStyles.text, styles.text, { marginBottom: 0 }]}>
                    {user.admin ? 'Admin' : 'Teacher'}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        paddingTop: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomColor: styleVar.blueShadow,
        borderBottomWidth: 2,
        backgroundColor: 'rgba(0, 122, 255, 0.12)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: Platform.OS === 'web' ? 0.3 : 0.1,
        shadowRadius: 6,
        elevation: 5
    },
    textContainer: {
        maxWidth: '100%',
        paddingHorizontal: 10
    },
    avatarContainer: {
        marginBottom: 12
    },
    text: {
        textAlign: 'center',
        marginBottom: 7,
        color: styleVar.gray,
    },
    name: {
        fontSize: styleVar.largeFontSize,
        color: styleVar.blue
    }
})