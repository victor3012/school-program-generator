import { useState } from "react";
import { FORM_STATUS, updateInputStatus } from "../services/util";

export default function useInputProps(name, { defaultValue = '', inputStatuses, setInputStatuses }) {
    const [value, setValue] = useState(defaultValue);

    const setInputValid = () => updateInputStatus(inputStatuses, setInputStatuses, name, FORM_STATUS.VALID);
    const setInputInvalid = () => updateInputStatus(inputStatuses, setInputStatuses, name, FORM_STATUS.INVALID);

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const onFocus = () => { };

    const onBlur = () => { };

    const onError = () => {
        setInputInvalid();
    };

    const onErrorResolve = () => {
        setInputValid();
    };


    return {
        value,
        setValue,
        onChange,
        onFocus,
        onBlur,
        onError,
        onErrorResolve
    };
}