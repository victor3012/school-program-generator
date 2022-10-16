import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
import styleVar from "../styles/styleVar";

export default function Input(
    {
        label,
        validator,
        defaultValue = '',
        style: customStyles = {},
        onChange: onChangeText,
        onFocus,
        onBlur,
        onError,
        onErrorResolve,
        required = false,
        ...args
    }
) {
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(null);
    const [beenFocused, setBeenFocused] = useState(false);

    const validate = (value) => {
        if (validator) {
            try {
                validator(value);

                if (onErrorResolve) {
                    onErrorResolve();
                }

                setError(null);
            } catch (err) {
                if (onError) {
                    onError();
                }

                setError(err.message)
            }
        }
    }

    const changeTextHandler = (value) => {
        value = value.trim();

        if (onChangeText) {
            onChangeText(value);
        }

        if (beenFocused) {
            validate(value);
        }
    }

    const focusHandler = () => {
        if (onFocus) {
            onFocus();
        }

        setFocused(true);
    }

    const blurHandler = (e) => {
        if (onBlur) {
            onBlur();
        }

        if (!beenFocused) {
            setBeenFocused(true);
        }
        
        validate(e.nativeEvent.text);

        setFocused(false);
    }

    const getInputBorderColor = () => {
        if (error) {
            return styleVar.red;
        }

        if (focused) {
            return styleVar.blue;
        }

        return customStyles.borderColor
            || styles.formTextInput.borderColor;
    }

    const getInputBackgroundColor = () => {
        if (focused && error) {
            return styleVar.white;
        }

        if (focused) {
            return styleVar.blueShadow;
        }

        if (error) {
            return styleVar.redShadow;
        }

        return customStyles.backgroundColor
            || styles.formTextInput.backgroundColor;
    }

    return (
        <View style={styles.container}>
            {(label || error) &&
                <View style={styles.textContainer}>
                    {label &&
                        <Text style={styles.text}>
                            {label}
                            {required &&
                                <Text style={{ color: getInputBorderColor() }}>*</Text>}
                        </Text>
                    }
                    {error &&
                        <Text style={{ ...styles.text, color: styleVar.red }}>
                            {' - ' + error}
                        </Text>
                    }
                </View>
            }

            <TextInput style={{
                ...styles.formTextInput,
                ...customStyles,
                borderColor: getInputBorderColor(),
                backgroundColor: getInputBackgroundColor()
            }}
                defaultValue={defaultValue}
                onChangeText={changeTextHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                {...args}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    text: {
        fontSize: styleVar.mediumFontSize,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: 300,
        flexWrap: 'wrap'
    },
    formTextInput: {
        outlineStyle: 'none',
        marginTop: 5,
        width: 300,
        height: 40,
        paddingHorizontal: 20,
        fontSize: styleVar.mediumFontSize,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgb(180, 214, 250)',
        backgroundColor: styleVar.blueShadow,
    }
})