import { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Input from "./Input";
import IconButton from "./IconButton";
import globalStyles from "../../styles/globalStyles";
import styles from '../../styles/specialInputStyles';
import styleVar from "../../styles/styleVar";
import XIcon from "../Icons/XIcon";

export default function SelectInput(
    {
        options = [],
        value = '',
        defaultValue = '',
        setValue,
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
        relativeDropdown = false,
        ...args
    }
) {
    const [focused, setFocused] = useState(false);
    const heightAnimation = useRef(new Animated.Value(0)).current;
    const dropdown = useRef(null);

    useEffect(() => {
        let animationValue = 0;

        if (focused) {
            animationValue = Math.min(getOptionsCount() * styles.option.height, styles.dropdown.maxHeight);
        }

        Animated.timing(
            heightAnimation,
            {
                toValue: animationValue,
                duration: 150,
                useNativeDriver: false
            }
        ).start();
    }, [focused, heightAnimation, options, value])

    const getOptionsCount = () => {
        let optionsCount = options.length;

        if (!required && Boolean(value)) {
            ++optionsCount;
        }

        return optionsCount;
    }

    const focusHandler = (e) => {
        if (onFocus) {
            onFocus(e.nativeEvent.text);
        }

        setFocused(true);
    }

    const blurHandler = (e) => {
        if (onBlur) {
            onBlur(e.nativeEvent.text);
        }

        if (dropdown.current &&
            (dropdown.current == e.nativeEvent.relatedTarget
                || dropdown.current.contains(e.nativeEvent.relatedTarget))) {
            return;
        }

        setFocused(false);
    }

    const selectOptionHandler = (option) => {
        setValue(option.value);

        setFocused(false);
    }

    const clearOptionHandler = () => {
        setValue(defaultValue);
    }


    return (
        <View elevation={10}
            style={{ zIndex: 10 }}>
            <View>
                <Input
                    label={label}
                    placeholder={placeholder}
                    validator={validator}
                    value={value}
                    style={customStyles}
                    containerStyle={containerStyle}
                    onChange={onChangeText}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    onError={onError}
                    onErrorResolve={onErrorResolve}
                    required={false}
                    editable={false}
                    selectTextOnFocus={false}
                    {...args} />

                <IconButton
                    style={globalStyles.InputIconButton}
                    Icon={(args) => <Icon {...args} name={focused ? 'arrow-up' : 'arrow-down'} color={styleVar.darkBlue} />}
                    onPress={() => setFocused(f => !f)} />
            </View>

            <Animated.ScrollView scrollEnabled={styles.dropdown.maxHeight / getOptionsCount() < styles.option.height}
                ref={dropdown}

                style={[styles.dropdown, {
                    height: heightAnimation
                }, (relativeDropdown && styles.relativeDropdown)]}>
                {
                    (!required && Boolean(value)) &&
                    <TouchableHighlight key='clear-option'
                        style={styles.option}
                        underlayColor={styleVar.blueShadow}
                        onPress={clearOptionHandler}>
                        <View style={styles.row}>
                            <XIcon style={{ marginRight: 5 }} />
                            <Text>Clear option</Text>
                        </View>
                    </TouchableHighlight>
                }
                {options.map(o =>
                    <TouchableHighlight key={o.key}
                        style={styles.option}
                        underlayColor={styleVar.blueShadow}
                        onPress={() => selectOptionHandler(o)}>
                        <Text style={globalStyles.text}>
                            {o.value}
                        </Text>
                    </TouchableHighlight>
                )}
            </Animated.ScrollView>
        </View>
    )
}