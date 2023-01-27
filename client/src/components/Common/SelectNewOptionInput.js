import { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableHighlight, Platform } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Input from "./Input";
import IconButton from "./IconButton";
import PlusIcon from "../Icons/PlusIcon";
import globalStyles from "../../styles/globalStyles";
import styles from '../../styles/specialInputStyles';
import styleVar from "../../styles/styleVar";
import XIcon from "../Icons/XIcon";

export default function SelectNewOptionInput(
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
        zIndex = 10,
        onChange: onChangeText,
        onFocus,
        onBlur,
        onError,
        onErrorResolve,
        required = false,
        relativeDropdown = false,
        newLabel = 'Add new',
        onNewOption,
        ...args
    }
) {
    const [focused, setFocused] = useState(false);
    const [editable, setEditable] = useState(false);
    const heightAnimation = useRef(new Animated.Value(0)).current;
    const dropdown = useRef(null);
    const input = useRef(null);

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
    }, [focused, heightAnimation, options, editable, value])

    const getOptionsCount = () => {
        let optionsCount = options.length;

        if (Boolean(value)) {
            ++optionsCount;
        }
        if (!editable) {
            ++optionsCount;
        }

        return optionsCount;
    }

    const getDropdownHeight = () => {
        return Math.min(getOptionsCount() * styles.option.height, styles.dropdown.maxHeight);
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
        setEditable(false);
        setFocused(false);
    }

    const clearOptionHandler = () => {
        setValue(defaultValue);
        setEditable(false);
    }

    const addNewOptionHandler = () => {
        setEditable(true);
        input?.current?.focus();
        setFocused(false);

        if (onNewOption) {
            onNewOption();
        }
    }

    return (
        <View elevation={zIndex}
            style={{ zIndex }}>
            <View>
                <Input
                    ref={input}
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
                    editable={editable}
                    selectTextOnFocus={editable}
                    {...args} />

                <IconButton
                    style={globalStyles.InputIconButton}
                    Icon={(args) => <Icon {...args} name={focused ? 'arrow-up' : 'arrow-down'} color={styleVar.darkBlue} />}
                    onPress={() => setFocused(f => !f)} />
            </View>

            <Animated.ScrollView scrollEnabled={styles.dropdown.maxHeight / getOptionsCount() < styles.option.height}
                ref={dropdown}
                style={[styles.dropdown, {
                    height: Platform.OS == 'web' ? heightAnimation : getDropdownHeight(),
                    maxHeight: getDropdownHeight()
                }, (relativeDropdown && styles.relativeDropdown),
                ((relativeDropdown && Platform.OS !== 'web' && !focused) && { display: 'none' })]}>
                {
                    Boolean(value) &&
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

                {
                    editable ||
                    <TouchableHighlight key='add-new-option'
                        style={styles.option}
                        underlayColor={styleVar.blueShadow}
                        onPress={addNewOptionHandler}>
                        <View style={styles.row}>
                            <PlusIcon style={{ marginRight: 5 }} />
                            <Text>{newLabel}</Text>
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
        </View >
    )
}