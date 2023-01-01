import { StyleSheet } from "react-native";
import styleVar from "./styleVar";
import globalStyles from "./globalStyles";

export default StyleSheet.create({
    formContainer: { // basic container required
        borderTopColor: styleVar.blueShadow,
        borderTopWidth: 5,
        paddingTop: 10,
    },
    passwordContainer: {
        position: "relative"
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    link: {
        ...globalStyles.link,
        marginLeft: 4
    }
})