import { StyleSheet } from "react-native";
import styleVar from "./styleVar";

export default StyleSheet.create({
    text: {
        fontSize: styleVar.mediumFontSize,
        letterSpacing: 0.25,
        color: styleVar.black
    },
    link: {
        fontSize: styleVar.mediumFontSize,
        letterSpacing: 0.25,
        color: styleVar.blue
    },
    basicContainer: {
        margin: 20,
        backgroundColor: styleVar.white,
        borderRadius: 20,
        padding: 30,
        textAlign: 'center',
        alignItems: "center",
        alignContent: 'center',
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5
    },
    formButton: {
        width: 300,
        height: 40,
        borderRadius: 20,
        paddingVertical: 0,
        paddingHorizontal: 0
    }
});