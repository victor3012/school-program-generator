import { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Input from "./Input";
import IconButton from "./IconButton";
import globalStyles from "../../styles/globalStyles";
import styles from '../../styles/specialInputStyles';
import styleVar from "../../styles/styleVar";

export default function AutocompleteInput(
    {
        options,
        value = '',
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
    const [displayOptions, setDisplayOptions] = useState([]);
    const heightAnimation = useRef(new Animated.Value(0)).current;
    const dropdown = useRef(null);

    useEffect(() => {
        setDisplayOptions(options || []);
    }, [options])

    useEffect(() => {
        if (!options) { return; }

        const newOptions = options
            .filter(o => o.value.toLocaleLowerCase()
                .includes(value.trim().toLocaleLowerCase()));

        setDisplayOptions(newOptions);
    }, [value, options]);

    useEffect(() => {
        let animationValue = 0;

        if (focused) {
            animationValue = Math.min(displayOptions.length * styles.option.height, styles.dropdown.maxHeight);
        }

        Animated.timing(
            heightAnimation,
            {
                toValue: animationValue,
                duration: 150,
                useNativeDriver: false
            }
        ).start();
    }, [focused, heightAnimation, displayOptions])

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
                    {...args} />

                <IconButton
                    style={globalStyles.InputIconButton}
                    Icon={(args) => <Icon {...args} name={focused ? 'arrow-up' : 'arrow-down'} color={styleVar.darkBlue} />}
                    onPress={() => setFocused(f => !f)} />
            </View>

            <Animated.ScrollView scrollEnabled={styles.dropdown.maxHeight / displayOptions.length < styles.option.height}
                ref={dropdown}
                style={[styles.dropdown, {
                    height: heightAnimation
                }, (relativeDropdown && styles.relativeDropdown)]}>
                {displayOptions.map(o =>
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