import { StyleSheet } from "react-native";
import styleVar from "./styleVar";

export default StyleSheet.create({
    text: {
        fontSize: styleVar.mediumFontSize,
        lineHeight: 1.25 * styleVar.mediumFontSize,
        letterSpacing: 0.25,
        color: styleVar.black
    },
    link: {
        textDecorationLine: 'underline',
        textDecorationColor: styleVar.blue
    }
});