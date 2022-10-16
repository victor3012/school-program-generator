import { StyleSheet } from "react-native";
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";

export default StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        margin: 20,
        backgroundColor: styleVar.white,
        borderRadius: 20,
        borderTopColor: styleVar.blueShadow,
        borderTopWidth: 5,
        padding: 30,
        paddingTop: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5
    },
    passwordContainer: {
        position: "relative"
    },
    eyeIcon: {
        position: 'absolute',
        bottom: 9,
        left: 270
    },
    button: {
        width: 300,
        height: 40,
        borderRadius: 20,
        paddingVertical: 0,
        paddingHorizontal: 0
    }
})