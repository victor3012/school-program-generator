import { useState } from "react";
import { useLinkTo } from "@react-navigation/native";

import Input from "../../../components/Common/Input";
import PressableBox from "../../../components/Common/PressableBox";
import ResponsiveModal from "../../../components/Common/ResponsiveModal";

import { FORM_STATUS } from "../../../services/util";
// import { createTimetable } from "../../services/schools";

import styleVar from '../../../styles/styleVar';
import PlusIcon from "../../../components/Icons/PlusIcon";
import useInputProps from "../../../hooks/useInputProps";
import validators from "../validators";

export default function CreateSchool() {
    const linkTo = useLinkTo();
    const [visible, setVisible] = useState(false);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());
    const timetableName = useInputProps('timetableName', { inputStatuses, setInputStatuses });


    const openCreateButtonHandler = () => setVisible(true);

    const submitHandler = async () => {
        const newName = timetableName.value.trim();
        timetableName.setValue(newName);

        validators.timetableName(newName);

        // const timetable = await createTimetable(newName);

        return timetable.id;
    }

    const successHandler = (timetableId) => {
        linkTo(`timetables/${timetableId}`);
    }

    const errorHandler = (error) => {
        alert(error.message);
    }

    const resetHandler = () => {
        timetableName.setValue('');
    }

    return (
        <>
            <ResponsiveModal title='Create new timetable'
                visible={visible} setVisible={setVisible}
                onSubmit={submitHandler}
                onFulfill={successHandler}
                onError={errorHandler}
                onReset={resetHandler}
                inputStatuses={inputStatuses}
            >
                <Input label='Timetable name'
                    required
                    value={timetableName.value}
                    validator={validators.timetableName}
                    onChange={timetableName.onChange}
                    onError={timetableName.onError}
                    onErrorResolve={timetableName.onErrorResolve}
                />
            </ResponsiveModal>

            <PressableBox onPress={openCreateButtonHandler}
                style={{ padding: 0 }}>
                <PlusIcon
                    size={65} />
            </PressableBox>
        </ >
    );
}

function getDefaultInputStatuses() {
    return {
        timetableName: FORM_STATUS.DEFAULT
    }
}