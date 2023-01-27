import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { FORM_STATUS, TEACHER_ROLES } from "../../../services/util";
import { createClass, deleteClass, editClass, getClassById, getClasses } from "../../../services/schools";
import Loader from "../../../components/Common/Loader";
import DataList from "../DataList";
import ClassesForm from "./ClassesForm";
import ClassesDataItem from "./ClassesDataItem";
import Dialog from "../../../components/Common/Dialog";
import useInputProps from "../../../hooks/useInputProps";
import validators from "../validators";

export default function Classes() {
    const { data: classes,
        setData: setClasses,
        removeById: removeClassById,
        updateById: updateClassById } = useContext(DataContext);

    const { school, teacher } = useContext(SchoolContext);

    const [modalFormVisible, setModalFormVisible] = useState(false);
    const [deleteDiaglogVisible, setDeleteDiaglogVisible] = useState(false);

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    const className = useInputProps('className', { inputStatuses, setInputStatuses });


    useFocusEffect(useCallback(() => {
        (async () => (
            setClasses(await getClasses(school.id))
        ))()
    }, []));

    useEffect(() => {
        if (toggleEditForm) {
            className.onErrorResolve();
            setModalFormVisible(true);
        }
    }, [toggleEditForm])


    const addButtonHandler = () => setModalFormVisible(true);

    const editButtonHandler = async (classObj) => {
        // open modal form (loading state)
        className.setValue(null); // cause of loading animation
        setToggleEditForm(true);

        // update information about selected object 
        let newClassObj;

        try {
            newClassObj = await getClassById(school.id, classObj.id);
        } catch (err) {
            resetHandler();
            setModalFormVisible(false);
            removeClassById(classObj.id);
            return; // TODO: Show notification for already deleted object
        }

        updateClassById(classObj.id, newClassObj);

        setSelectedClass(newClassObj);

        className.setValue(newClassObj.name);
    }

    const deleteButtonHandler = async (classObj) => {
        // open dialog (loading state)        
        setSelectedClass(null); // cause of loading animation
        setDeleteDiaglogVisible(true);

        // update information about selected object 
        let newClassObj;

        try {
            newClassObj = await getClassById(school.id, classObj.id);
        } catch (err) {
            setDeleteDiaglogVisible(false);
            removeClassById(classObj.id);
            return; // TODO: Show notification for already deleted object
        }

        updateClassById(classObj.id, newClassObj);

        setSelectedClass(newClassObj);
    }

    const deleteClassHanlder = async () => {
        await deleteClass(school.id, selectedClass.id);
        removeClassById(selectedClass.id);
    }

    const submitHandler = async () => {
        validators.className(className.value);

        const res = toggleEditForm
            ? await editClass(school.id, selectedClass.id, { name: className.value.trim() })
            : await createClass(school.id, className.value.trim());

        setClasses(res);
    }

    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        className.setValue('');
        setInputStatuses(getDefaultInputStatuses());
        setToggleEditForm(false);
        setSelectedClass(null);
    }

    return (
        classes
            ?
            <>
                {TEACHER_ROLES[teacher.role] >= TEACHER_ROLES.SYSTEM_ADMIN &&
                    <>
                        <ClassesForm
                            visible={modalFormVisible}
                            setVisible={setModalFormVisible}
                            onSubmit={submitHandler}
                            onError={errorHandler}
                            onReset={resetHandler}
                            inputStatuses={inputStatuses}
                            className={className}
                        />

                        <Dialog
                            title={`Are you sure you want to delete ${selectedClass?.name || 'this class'}?`}
                            visible={deleteDiaglogVisible}
                            setVisible={setDeleteDiaglogVisible}
                            onAccept={deleteClassHanlder}
                            onError={errorHandler}
                            isLoading={selectedClass === null}
                        />
                    </>
                }

                <DataList
                    data={classes}
                    actions={{ edit: editButtonHandler, delete: deleteButtonHandler }}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={ClassesDataItem}
                />
            </>
            :
            <Loader />
    )
}

function filterCallback(query, classObj) {
    return classObj.name
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}

function getDefaultInputStatuses() {
    return {
        className: FORM_STATUS.DEFAULT
    }
}