import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { FORM_STATUS, TEACHER_ROLES } from "../../../services/util";
import {
    getSubjects,
    getSubjectById,
    createSubject,
    editSubject,
    deleteSubject,
    getSubjectTypes,
    getRoomTypes,
} from "../../../services/schools";
import useInputProps from "../../../hooks/useInputProps";

import validators from "../validators";

import DataList from "../DataList";
import Loader from "../../../components/Common/Loader";
import SubjectsForm from "./SubjectsForm";
import SubjectsDataItem from "./SubjectsDataItem";
import Dialog from "../../../components/Common/Dialog";

export default function Subjects() {
    const { data: subjects,
        setData: setSubjects,
        removeById: removeSubjectById,
        updateById: updateSubjectById } = useContext(DataContext);

    const { school, teacher } = useContext(SchoolContext);

    const [modalFormVisible, setModalFormVisible] = useState(false);
    const [deleteDiaglogVisible, setDeleteDiaglogVisible] = useState(false);

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const [subjectTypeOptions, setSubjectTypeOptions] = useState();
    const [roomTypeOptions, setRoomTypeOptions] = useState();

    const subjectName = useInputProps('subjectName', { inputStatuses, setInputStatuses });
    const subjectType = useInputProps('subjectType', { inputStatuses, setInputStatuses });
    const roomType = useInputProps('roomType', { inputStatuses, setInputStatuses });

    useFocusEffect(useCallback(() => {
        Promise.all([getSubjects(school.id), getSubjectTypes(school.id), getRoomTypes(school.id)])
            .then(res => {
                setSubjects(res[0]);

                setSubjectTypeOptions(res[1].map(t => ({ key: t.id, value: t.name })));

                setRoomTypeOptions(res[2].map(t => ({ key: t.id, value: t.name })));
            })
    }, []));

    useEffect(() => {
        if (toggleEditForm) {
            subjectName.onErrorResolve();
            subjectType.onErrorResolve();
            roomType.onErrorResolve();
            setModalFormVisible(true);
        }
    }, [toggleEditForm])

    const addButtonHandler = () => setModalFormVisible(true);

    const editButtonHandler = async (subject) => {
        // open modal form (loading state)
        subjectName.setValue(null); // cause of loading animation
        subjectType.setValue(null);
        roomType.setValue(null);
        setToggleEditForm(true);

        // update information about selected object 
        let newSubject;

        try {
            newSubject = await getSubjectById(school.id, subject.id);
        } catch (err) {
            resetHandler();
            setModalFormVisible(false);
            removeSubjectById(subject.id);
            return; // TODO: Show notification for already deleted object
        }

        updateSubjectById(subject.id, newSubject);

        setSelectedSubject(newSubject);

        subjectName.setValue(newSubject.name);
        subjectType.setValue(newSubject.type);
        roomType.setValue(newSubject.roomType);
    }

    const deleteButtonHandler = async (subject) => {
        // open dialog (loading state)        
        setSelectedSubject(null); // cause of loading animation
        setDeleteDiaglogVisible(true);

        // update information about selected object 
        let newSubject;

        try {
            newSubject = await getSubjectById(school.id, subject.id);
        } catch (err) {
            setDeleteDiaglogVisible(false);
            removeSubjectById(subject.id);
            return; // TODO: Show notification for already deleted object
        }

        updateSubjectById(subject.id, newSubject);

        setSelectedSubject(newSubject);
    }

    const deleteSubjectHanlder = async () => {
        await deleteSubject(school.id, selectedSubject.id);
        removeSubjectById(selectedSubject.id);
    }

    const submitHandler = async () => {
        validators.name(subjectName.value);
        validators.subjectType(subjectType.value);
        validators.roomType(roomType.value);

        const reqBody = {
            name: subjectName.value.trim(),
            type: subjectType.value.trim(),
            roomType: roomType.value.trim()
        };

        const res = toggleEditForm
            ? await editSubject(school.id, selectedSubject.id, reqBody)
            : await createSubject(school.id, reqBody);

        setSubjects(res);
    }

    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        subjectName.setValue('');
        roomType.setValue('');
        subjectType.setValue('');
        setInputStatuses(getDefaultInputStatuses());
        setToggleEditForm(false);
        setSelectedSubject(null);
    }

    return (
        subjects
            ?
            <>
                {TEACHER_ROLES[teacher.role] >= TEACHER_ROLES.SYSTEM_ADMIN &&
                    <>
                        <SubjectsForm
                            visible={modalFormVisible}
                            setVisible={setModalFormVisible}
                            onSubmit={submitHandler}
                            onError={errorHandler}
                            onReset={resetHandler}
                            inputStatuses={inputStatuses}
                            subjectName={subjectName}
                            subjectType={subjectType}
                            subjectTypeOptions={subjectTypeOptions}
                            roomType={roomType}
                            roomTypeOptions={roomTypeOptions}
                        />

                        <Dialog
                            title={`Are you sure you want to delete ${selectedSubject?.name || 'this subjects'}?`}
                            visible={deleteDiaglogVisible}
                            setVisible={setDeleteDiaglogVisible}
                            onAccept={deleteSubjectHanlder}
                            onError={errorHandler}
                            isLoading={selectedSubject === null}
                        />
                    </>
                }

                <DataList
                    data={subjects}
                    actions={{ edit: editButtonHandler, delete: deleteButtonHandler }}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={SubjectsDataItem}
                />
            </>
            :
            <Loader />
    )
}

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
        subjectType: FORM_STATUS.DEFAULT,
        roomType: FORM_STATUS.DEFAULT,
    }
}