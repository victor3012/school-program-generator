import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS, updateInputStatus } from "../../services/util";
import { createSubject, getRoomTypes, getSubjects, getSubjectTypes } from "../../services/schools";

import validators from "./validators";

import Loader from "../../components/Common/Loader";
import DataItemContainer from "./DataItemContainer";
import DataList from "./DataList";
import ResponsiveModal from "../../components/Common/ResponsiveModal";
import Input from "../../components/Common/Input";
import Form from "../../components/Common/Form";
import SelectNewOptionInput from "../../components/Common/SelectNewOptionInput";
import SelectInput from "../../components/Common/SelectInput";
import OptionsMenu from "../../components/Common/OptionsMenu/OptionsMenu";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import Option from "../../components/Common/OptionsMenu/Option";

import globalStyles from "../../styles/globalStyles";
import modalFormStyles from "../../styles/modalFormStyles";
import styleVar from "../../styles/styleVar";

export default function Subjects() {
    const { data: subjects, setData: setSubjects } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);

    const [subjectTypeOptions, setSubjectTypeOptions] = useState();
    const [roomTypeOptions, setRoomTypeOptions] = useState();

    const [subjectName, setSubjectName] = useState('');
    const [subjectType, setSubjectType] = useState('');
    const [roomType, setRoomType] = useState('');
    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    useFocusEffect(useCallback(() => {
        Promise.all([getSubjects(school.id), getSubjectTypes(school.id), getRoomTypes(school.id)])
        .then(res => {
            setSubjects(res[0]);

            setSubjectTypeOptions(res[1].map(t => ({ key: t.id, value: t.name })));

            setRoomTypeOptions(res[2].map(t => ({ key: t.id, value: t.name })));
        })
    }, []));

    const addButtonHandler = () => setCreateModalVisible(true);

    const submitHandler = async () => {
        const res = await createSubject(school.id, {
            name: subjectName,
            type: subjectType,
            roomType
        });
        setSubjects(res);
    }
    const errorHandler = (error) => alert(error.message);
    const resetHandler = () => {
        setInputStatuses(getDefaultInputStatuses());
        setSubjectName('');
        setRoomType('');
    }

    const onNameChange = (value) => setSubjectName(value);
    const onSubjectTypeChange = (value) => setSubjectType(value);
    const onRoomTypeChange = (value) => setRoomType(value);

    const onNameError = () => setInputInvalid('subjectName');
    const onSubjectTypeError = () => setInputInvalid('subjectType');
    const onRoomTypeError = () => setInputInvalid('roomType');

    const onNameErrorResolve = () => setInputValid('subjectName');
    const onSubjectTypeErrorResolve = () => setInputValid('subjectType');
    const onRoomTypeErrorResolve = () => setInputValid('roomType');

    const setInputValid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.VALID);
    const setInputInvalid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.INVALID);

    return (
        subjects
            ?
            <>
                <ResponsiveModal
                    visible={createModalVisible} setVisible={setCreateModalVisible}
                    onSubmit={submitHandler}
                    onError={errorHandler}
                    onReset={resetHandler}
                    inputStatuses={inputStatuses}
                    containerStyle={modalFormStyles.responsiveModal}>
                    <Form inputStatuses={inputStatuses} style={modalFormStyles.form}>
                        <Input label='Subject name'
                            required
                            value={subjectName}
                            validator={validators.room}
                            onChange={onNameChange}
                            onError={onNameError}
                            onErrorResolve={onNameErrorResolve}
                        />

                        <SelectNewOptionInput label='Subject type'
                            relativeDropdown={true}
                            required
                            value={subjectType}
                            validator={validators.subjectType}
                            setValue={setSubjectType}
                            onChange={onSubjectTypeChange}
                            onError={onSubjectTypeError}
                            onErrorResolve={onSubjectTypeErrorResolve}
                            options={subjectTypeOptions}
                        />

                        <SelectInput label='Room type'
                            relativeDropdown={true}
                            required
                            value={roomType}
                            validator={validators.room}
                            setValue={setRoomType}
                            onChange={onRoomTypeChange}
                            onError={onRoomTypeError}
                            onErrorResolve={onRoomTypeErrorResolve}
                            options={roomTypeOptions}
                        />
                    </Form>
                </ResponsiveModal>

                <DataList
                    data={subjects}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={DataItem}
                />
            </>
            :
            <Loader />
    )
}

function DataItem({ data }) {
    return (
        <DataItemContainer key={data.id}>
            <Text style={[globalStyles.text, styles.nonselectable, styles.type]}>{data.roomType || '-'}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{data.name}</Text>
            <OptionsMenu containerStyle={styles.optionsButton}>
                <Option>
                    <Text style={globalStyles.text}>
                        Edit
                    </Text>
                    <EditIcon />
                </Option>
                <Option last>
                    <Text style={globalStyles.text}>
                        Delete
                    </Text>
                    <DeleteIcon />
                </Option>
            </OptionsMenu>
        </DataItemContainer>
    )
}

const styles = StyleSheet.create({
    nonselectable: {
        userSelect: 'none'
    },
    type: {
        flex: 1,
        color: styleVar.gray
    },
    name: {
        flex: 2
    },
    optionsButton: {
        flex: 1
    }
})


function filterCallback(query, subject) {
    return subject.name
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}

function getDefaultInputStatuses() {
    return {
        subjectName: FORM_STATUS.DEFAULT,
        roomType: FORM_STATUS.NOT_REQUIRED,
    }
}