import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS } from "../../services/util";
import { createRoom, getRooms } from "../../services/schools";
import validators from "./validators";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";
import Loader from "../../components/Common/Loader";
import DataItemContainer from "./DataItemContainer";
import DataList from "./DataList";
import ResponsiveModal from "../../components/Common/ResponsiveModal";
import Input from "../../components/Common/Input";

export default function Rooms() {
    const { data: rooms, setData: setRooms } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [status, setStatus] = useState(FORM_STATUS.DEFAULT);

    useFocusEffect(useCallback(() => {
        (async () => {
            const res = await getRooms(school.id);
            setRooms(res);
        })()
    }, []));

    const addButtonHandler = () => setCreateModalVisible(true);
    const submitHandler = async () => {
        const res = await createRoom(school.id, roomName);
        setRooms(res);
    }
    const errorHandler = (error) => alert(error.message);
    const resetHandler = () => setRoomName('');
    const changeHandler = (value) => setRoomName(value);
    const onInputError = () => setStatus(FORM_STATUS.INVALID);
    const onInputErrorResolve = () => setStatus(FORM_STATUS.VALID);

    return (
        rooms
            ?
            <>
                <ResponsiveModal title='New Room'
                    visible={createModalVisible} setVisible={setCreateModalVisible}
                    onSubmit={submitHandler}
                    onError={errorHandler}
                    onReset={resetHandler}
                    inputStatuses={{ status }}
                >
                    <Input label='Room name'
                        showError={false}
                        required
                        value={roomName}
                        validator={validators.room}
                        onChange={changeHandler}
                        onError={onInputError}
                        onErrorResolve={onInputErrorResolve}
                    />
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
        <DataItemContainer>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{data.name}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.stars]}>* * *</Text>
        </DataItemContainer>
    )
}

const styles = StyleSheet.create({
    nonselectable: {
        userSelect: 'none'
    },
    name: {
        flex: 2
    },
    stars: {
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