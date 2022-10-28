import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, TouchableOpacity } from "react-native";

import styleVar from "../../styles/styleVar";

export default function EyeIconButton({ passwordShown, setPasswordShown }) {
    return (
        <TouchableOpacity style={styles.button}
            hitSlop={15}
            onPress={() => setPasswordShown(ps => !ps)}>
            <Icon name={passwordShown ? 'eye-outline' : 'eye-off-outline'}
                size={styleVar.mediumIconSize}
                color='gray' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        top: 38,
        right: 0,
        width: 2 * styleVar.mediumIconSize,
        paddingRight: 3,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
})