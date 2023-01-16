import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS, updateInputStatus } from "../../services/util";
import { createRoom, getRooms } from "../../services/schools";
import validators from "./validators";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";
import modalFormStyles from "../../styles/modalFormStyles";
import Loader from "../../components/Common/Loader";
import DataItemContainer from "./DataItemContainer";
import DataList from "./DataList";
import ResponsiveModal from "../../components/Common/ResponsiveModal";
import Input from "../../components/Common/Input";
import Form from "../../components/Common/Form";
import SelectNewOptionInput from "../../components/Common/SelectNewOptionInput";
import OptionsMenu from "../../components/Common/OptionsMenu/OptionsMenu";
import Option from "../../components/Common/OptionsMenu/Option";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";

export default function Rooms() {
    const { data: rooms, setData: setRooms } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);

    const [roomTypeOptions, setRoomTypeOptions] = useState([{ key: 1, value: 'test 1' }, { key: 2, value: 'test 2' }, { key: 3, value: 'test 3' }]);

    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    useFocusEffect(useCallback(() => {
        (async () => {
            const res = await getRooms(school.id);
            setRooms(res);
        })()
    }, []));

    const addButtonHandler = () => setCreateModalVisible(true);

    const submitHandler = async () => {
        const res = await createRoom(school.id, {
            name: roomName,
            type: roomType
        });

        setRooms(res);
    }
    const errorHandler = (error) => alert(error.message);
    const resetHandler = () => {
        setInputStatuses(getDefaultInputStatuses());
        setRoomName('');
        setRoomType('');
    }

    const onNameChange = (value) => setRoomName(value);
    const onTypeChange = (value) => setRoomType(value);

    const onNameError = () => setInputInvalid('roomName');
    const onTypeError = () => setInputInvalid('roomType');

    const onNameErrorResolve = () => setInputValid('roomName');
    const onTypeErrorResolve = () => setInputValid('roomType');

    const setInputValid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.VALID);
    const setInputInvalid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.INVALID);

    return (
        rooms
            ?
            <>
                <ResponsiveModal
                    visible={createModalVisible} setVisible={setCreateModalVisible}
                    onSubmit={submitHandler}
                    onError={errorHandler}
                    onReset={resetHandler}
                    inputStatuses={inputStatuses}
                    containerStyle={modalFormStyles.responsiveModal}
                >
                    <Form inputStatuses={inputStatuses} style={modalFormStyles.form}>
                        <Input label='Room name'
                            required
                            value={roomName}
                            validator={validators.room}
                            onChange={onNameChange}
                            onError={onNameError}
                            onErrorResolve={onNameErrorResolve}
                        />

                        <SelectNewOptionInput label='Room type'
                            required
                            relativeDropdown={true}
                            value={roomType}
                            validator={validators.room}
                            setValue={setRoomType}
                            onChange={onTypeChange}
                            onError={onTypeError}
                            onErrorResolve={onTypeErrorResolve}
                            options={roomTypeOptions}
                        />
                    </Form>
                </ResponsiveModal>

                <DataList
                    data={rooms}
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


function filterCallback(query, room) {
    return room.name
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}

function getDefaultInputStatuses() {
    return {
        roomName: FORM_STATUS.DEFAULT,
        roomType: FORM_STATUS.NOT_REQUIRED,
    }
}