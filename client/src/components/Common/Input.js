import { forwardRef, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View, Animated } from "react-native";
import styleVar from "../../styles/styleVar";

const startingLabelX = 0;
const startingLabelY = 35;

const Input = forwardRef(function Input({
    value,
    label,
    placeholder,
    validator,
    style: customStyles = {},
    containerStyle = {},
    onChange: onChangeText,
    onFocus,
    onBlur,
    onError,
    onErrorResolve,
    required = false,
    showError = true,
    ...args
}, ref) {
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(null);
    const [beenFocused, setBeenFocused] = useState(false);

    const labelXY = useRef(new Animated.ValueXY({ x: startingLabelX, y: startingLabelY })).current;

    useEffect(() => {
        if (value) {
            if (!focused) {
                setBeenFocused(true);
            }

            Animated.spring(labelXY, { toValue: { x: startingLabelX, y: 0 }, useNativeDriver: true }).start();
        }

        validate(value);
    }, [value])

    const validate = (value, showError = beenFocused) => {
        if (validator) {
            try {
                validator(value);

                if (onErrorResolve) {
                    onErrorResolve();
                }

                setError(null);
            } catch (err) {
                if (!showError) {
                    return;
                }

                if (onError) {
                    onError();
                }

                setError(err.message)
            }
        }
    }

    const changeTextHandler = (value) => {
        if (onChangeText) {
            onChangeText(value);
        }
    }

    const focusHandler = (e) => {
        if (onFocus) {
            onFocus(e.nativeEvent.text);
        }

        Animated.spring(labelXY, { toValue: { x: startingLabelX, y: 0 }, useNativeDriver: true }).start();

        setFocused(true);
    }

    const blurHandler = (e, isDefaultEventOnAndroid = true) => {
        if (Platform.OS === 'android' && isDefaultEventOnAndroid) {
            return;
        }

        if (onBlur) {
            onBlur(e);
        }

        if (!beenFocused) {
            setBeenFocused(true);
        }

        validate(e.nativeEvent.text, true);

        if (!e.nativeEvent.text && !value) {
            Animated.spring(labelXY, { toValue: { x: startingLabelX, y: startingLabelY }, useNativeDriver: true }).start();
        }

        setFocused(false);
    }

    const androidBlurHandler = (e) => {
        if (Platform.OS !== 'android') {
            return;
        }

        blurHandler(e, false);
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
        <View style={[styles.container, containerStyle]}>
            {label &&
                <Animated.View selectable={false}
                    pointerEvents="none"
                    style={[styles.textContainer,
                    styles.label,
                    {
                        position: 'relative',
                        transform: [
                            { translateX: labelXY.x },
                            { translateY: labelXY.y }]
                    }]}
                >
                    {typeof label === 'string'
                        ? <Text selectable={false} style={styles.text}>
                            {label}
                        </Text>
                        : label}
                    {required &&
                        <Text selectable={false} style={{ color: getInputBorderColor() }}>*</Text>}
                </Animated.View>
            }

            <TextInput style={{
                ...styles.formTextInput,
                ...customStyles,
                borderColor: getInputBorderColor(),
                backgroundColor: getInputBackgroundColor()
            }}
                ref={ref}
                onChangeText={changeTextHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                onEndEditing={androidBlurHandler}
                placeholder={label ? '' : placeholder}
                value={value}
                {...args} />
            {
                showError && error &&
                <View style={styles.textContainer}>
                    <Text lineBreakMode="middle" style={{ ...styles.text, color: styleVar.red }}>
                        {error}
                    </Text>
                </View>
            }
        </View >
    )
})

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
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
    label: {
        zIndex: 1,
        maxWidth: '100%'
    },
    formTextInput: {
        outlineStyle: 'none',
        marginTop: 5,
        width: 300,
        height: 40,
        paddingHorizontal: 20,
        fontSize: styleVar.mediumFontSize,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgb(180, 214, 250)',
        backgroundColor: styleVar.blueShadow,
        textAlign: 'center'
    }
})

export default Input;