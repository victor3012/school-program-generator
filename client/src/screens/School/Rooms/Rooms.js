import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { FORM_STATUS, TEACHER_ROLES } from "../../../services/util";
import {
    createRoom,
    deleteRoom,
    editRoom,
    getRoomById,
    getRooms,
    getRoomTypes
} from "../../../services/schools";
import useInputProps from "../../../hooks/useInputProps";

import validators from "../validators";

import Loader from "../../../components/Common/Loader";
import DataList from "../DataList";
import RoomsForm from "./RoomsForm";
import Dialog from "../../../components/Common/Dialog";
import RoomsDataItem from "./RoomsDataItem";

export default function Rooms() {
    const { data: rooms,
        setData: setRooms,
        removeById: removeRoomById,
        updateById: updateRoomById } = useContext(DataContext);

    const { school, teacher } = useContext(SchoolContext);

    const [modalFormVisible, setModalFormVisible] = useState(false);
    const [deleteDiaglogVisible, setDeleteDiaglogVisible] = useState(false);

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const [roomTypeOptions, setRoomTypeOptions] = useState();

    const roomName = useInputProps('roomName', { inputStatuses, setInputStatuses });
    const roomType = useInputProps('roomType', { inputStatuses, setInputStatuses });

    useFocusEffect(useCallback(() => {
        Promise.all([getRooms(school.id), getRoomTypes(school.id)])
            .then(res => {
                setRooms(res[0]);
                setRoomTypeOptions(res[1].map(t => ({ key: t.id, value: t.name })));
            })
    }, []));

    useEffect(() => {
        if (toggleEditForm) {
            roomName.onErrorResolve();
            roomType.onErrorResolve();
            setModalFormVisible(true);
        }
    }, [toggleEditForm])

    const addButtonHandler = () => setModalFormVisible(true);

    const editButtonHandler = async (room) => {
        // open modal form (loading state)
        roomName.setValue(null); // cause of loading animation
        roomType.setValue(null);
        setToggleEditForm(true);

        // update information about selected object 
        let newRoom;

        try {
            newRoom = await getRoomById(school.id, room.id);
        } catch (err) {
            resetHandler();
            setModalFormVisible(false);
            removeRoomById(room.id);
            return; // TODO: Show notification for already deleted object
        }

        updateRoomById(room.id, newRoom);

        setSelectedRoom(newRoom);

        roomName.setValue(newRoom.name);
        roomType.setValue(newRoom.roomType);
    }

    const deleteButtonHandler = async (room) => {
        // open dialog (loading state)        
        setSelectedRoom(null); // cause of loading animation
        setDeleteDiaglogVisible(true);

        // update information about selected object 
        let newRoom;

        try {
            newRoom = await getRoomById(school.id, room.id);
        } catch (err) {
            setDeleteDiaglogVisible(false);
            removeRoomById(room.id);
            return; // TODO: Show notification for already deleted object
        }

        updateRoomById(room.id, newRoom);

        setSelectedRoom(newRoom);
    }

    const deleteRoomHanlder = async () => {
        await deleteRoom(school.id, selectedRoom.id);
        removeRoomById(selectedRoom.id);
    }

    const submitHandler = async () => {
        validators.room(roomName.value);
        validators.roomType(roomType.value);

        const reqBody = {
            name: roomName.value.trim(),
            type: roomType.value.trim()
        };

        const res = toggleEditForm
            ? await editRoom(school.id, selectedRoom.id, reqBody)
            : await createRoom(school.id, reqBody);

        setRooms(res);
    }

    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        roomName.setValue('');
        roomType.setValue('');
        setInputStatuses(getDefaultInputStatuses());
        setToggleEditForm(false);
        setSelectedRoom(null);
    }

    return (
        rooms
            ?
            <>
                {TEACHER_ROLES[teacher.role] >= TEACHER_ROLES.SYSTEM_ADMIN &&
                    <>
                        <RoomsForm
                            visible={modalFormVisible}
                            setVisible={setModalFormVisible}
                            onSubmit={submitHandler}
                            onError={errorHandler}
                            onReset={resetHandler}
                            inputStatuses={inputStatuses}
                            roomName={roomName}
                            roomType={roomType}
                            roomTypeOptions={roomTypeOptions}
                        />

                        <Dialog
                            title={`Are you sure you want to delete ${selectedRoom?.name || 'this room'}?`}
                            visible={deleteDiaglogVisible}
                            setVisible={setDeleteDiaglogVisible}
                            onAccept={deleteRoomHanlder}
                            onError={errorHandler}
                            isLoading={selectedRoom === null}
                        />
                    </>
                }

                <DataList
                    data={rooms}
                    actions={{ edit: editButtonHandler, delete: deleteButtonHandler }}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={RoomsDataItem}
                />
            </>
            :
            <Loader />
    )
}

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
        roomType: FORM_STATUS.DEFAULT,
    }
}