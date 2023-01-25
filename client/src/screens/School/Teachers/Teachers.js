import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { deleteTeacher, editTeacher, getTeacherById, getTeachers } from "../../../services/schools";
import Loader from "../../../components/Common/Loader";
import DataList from "../DataList";
import TeachersForm from "./TeachersForm";
import TeachersDataItem from "./TeachersDataItem";
import Dialog from "../../../components/Common/Dialog";
import { FORM_STATUS, TEACHER_ROLES, TEACHER_ROLES_NAMES } from "../../../services/util";
import useInputProps from "../../../hooks/useInputProps";

export default function Teachers() {
    const { data: teachers,
        setData: setTeachers,
        removeById: removeTeacherById,
        updateById: updateTeacherById } = useContext(DataContext);

    const { school, teacher } = useContext(SchoolContext);

    const [modalFormVisible, setModalFormVisible] = useState(false);
    const [deleteDiaglogVisible, setDeleteDiaglogVisible] = useState(false);

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const role = useInputProps('role', { defaultValue: TEACHER_ROLES_NAMES.TEACHER, inputStatuses, setInputStatuses });
    const firstName = useInputProps('firstName', { inputStatuses, setInputStatuses });
    const lastName = useInputProps('lastName', { inputStatuses, setInputStatuses });
    const email = useInputProps('email', { inputStatuses, setInputStatuses });

    useFocusEffect(useCallback(() => {
        (async () => {
            const res = await getTeachers(school.id);
            setTeachers(res);
        })()
    }, []));

    useEffect(() => {
        if (toggleEditForm) {
            role.onErrorResolve();
            firstName.onErrorResolve();
            lastName.onErrorResolve();
            email.onErrorResolve();
            setModalFormVisible(true);
        }
    }, [toggleEditForm])

    const getTeacherRoles = () => {
        const teacherKeys = Object.keys(TEACHER_ROLES);
        return teacherKeys.slice(0, teacherKeys.indexOf(teacher.role))
            .map(role => ({
                key: role,
                value: TEACHER_ROLES_NAMES[role]
            }));
    }

    const addButtonHandler = () => setModalFormVisible(true);

    const editButtonHandler = async (teacher) => {
        // open modal form (loading state)
        role.setValue(null); // cause of loading animation
        firstName.setValue(null);
        lastName.setValue(null);
        email.setValue(null);
        setToggleEditForm(true);

        // update information about selected object 
        let newTeacher;

        try {
            newTeacher = await getTeacherById(school.id, teacher.id);
        } catch (err) {
            resetHandler();
            setModalFormVisible(false);
            removeTeacherById(teacher.id);
            return; // TODO: Show notification for already deleted object
        }

        updateTeacherById(teacher.id, newTeacher);

        setSelectedTeacher(newTeacher);

        role.setValue(newTeacher.role);
        firstName.setValue(newTeacher.firstName);
        lastName.setValue(newTeacher.lastName);
        email.setValue(newTeacher.email);
    }

    const deleteButtonHandler = async (teacher) => {
        // open dialog (loading state)        
        setSelectedTeacher(null); // cause of loading animation
        setDeleteDiaglogVisible(true);

        // update information about selected object 
        let newTeacher;

        try {
            newTeacher = await getTeacherById(school.id, teacher.id);
        } catch (err) {
            setDeleteDiaglogVisible(false);
            removeTeacherById(teacher.id);
            return; // TODO: Show notification for already deleted object
        }

        updateTeacherById(teacher.id, newTeacher);

        setSelectedTeacher(newTeacher);
    }

    const deleteTeacherHanlder = async () => {
        await deleteTeacher(school.id, selectedTeacher.id);
        removeTeacherById(selectedTeacher.id);
    }

    const submitHandler = async () => {
        validators.role(teacher.role)(role.value);
        validators.name(firstName.value);
        validators.name(lastName.value);
        validators.email(email.value);

        const teacherRole = options.find(o => o.value === role.value).key;

        const reqBody = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            role: teacherRole
        }

        const res = toggleEditForm
            ? await editTeacher(school.id, selectedTeacher.id, reqBody)
            : await createTeacher(school.id, reqBody);

        setTeachers(res);
    }

    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        role.setValue(TEACHER_ROLES_NAMES.TEACHER);
        firstName.setValue('');
        lastName.setValue('');
        email.setValue('');
        setInputStatuses(getDefaultInputStatuses());
        setToggleEditForm(false);
        setSelectedTeacher(null);
    }

    return (
        teachers
            ?
            <>
                {TEACHER_ROLES[teacher.role] >= TEACHER_ROLES.SYSTEM_ADMIN &&
                    <>
                        <TeachersForm
                            visible={modalFormVisible}
                            setVisible={setModalFormVisible}
                            onSubmit={submitHandler}
                            onError={errorHandler}
                            onReset={resetHandler}
                            inputStatuses={inputStatuses}
                            role={role}
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            roleOptions={getTeacherRoles()}
                        />

                        <Dialog
                            title={`Are you sure you want to delete ${selectedTeacher?.name || 'this teacher'}?`}
                            visible={deleteDiaglogVisible}
                            setVisible={setDeleteDiaglogVisible}
                            onAccept={deleteTeacherHanlder}
                            onError={errorHandler}
                            isLoading={selectedTeacher === null}
                        />
                    </>
                }

                <DataList
                    data={teachers}
                    actions={{ edit: editButtonHandler, delete: deleteButtonHandler }}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={TeachersDataItem}
                />
            </>
            :
            <Loader />
    )
}

function getTeacherName(teacher) {
    return `${teacher.firstName} ${teacher.lastName}`
}

function filterCallback(query, teacher) {
    return getTeacherName(teacher)
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}

function getDefaultInputStatuses() {
    return {
        role: FORM_STATUS.DEFAULT,
        firstName: FORM_STATUS.DEFAULT,
        lastName: FORM_STATUS.DEFAULT,
        email: FORM_STATUS.DEFAULT
    }
}