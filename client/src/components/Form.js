import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getFormStatus } from "../services/util";
import globalStyles from "../styles/globalStyles";
import styleVar from "../styles/styleVar";

const getContainerBorderTopColor = (formStatus) => {
    if (formStatus == 2) {
        return styleVar.red;
    }

    if (formStatus == 1) {
        return styleVar.blue;
    }

    return styleVar.blueShadow;
}

export default function Form({ children,
    style: customStyle,
    inputStatuses = {},
    ...args }) {
    const [formStatus, setFormStatus] = useState(0); // 0 -> not filled in; 1 -> valid for submiting; 2 -> error

    useEffect(() => {
        setFormStatus(getFormStatus(inputStatuses))
    }, [inputStatuses])

    return (
        <View style={styles.container}>
            <ScrollView {...args} contentContainerStyle={[globalStyles.basicContainer,
            styles.form,
            { borderTopColor: getContainerBorderTopColor(formStatus) },
                customStyle]}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1
    },
    form: { // basic container required
        borderTopColor: styleVar.blueShadow,
        borderTopWidth: 5,
        paddingTop: 10
    }
})