import { StyleSheet } from "react-native";
import styleVar from "./styleVar";

export default StyleSheet.create({
    relativeDropdown: {
        position: 'relative',
        top: 0
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        width: 300,
        maxHeight: 200,
        marginVertical: 2,
        backgroundColor: styleVar.white,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5
    },
    option: {
        height: 40,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})