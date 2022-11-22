import { StyleSheet } from "react-native"
import PressableBox from "../../components/PressableBox"

export default function DataItemContainer({
    children,
    style: customStyle,
    ...props }) {
    return (
        <PressableBox style={[styles.container, customStyle]} {...props}>
            {children}
        </PressableBox>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 10,
        padding: 5,
        width: '100%',
        borderRadius: 0,
        height: 80
    }
})