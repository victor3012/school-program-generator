import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { FORM_STATUS, TEACHER_ROLES, updateInputStatus } from "../../../services/util";
import { createClass, deleteClass, editClass, getClassById, getClasses } from "../../../services/schools";
import Loader from "../../../components/Common/Loader";
import DataList from "../DataList";
import ClassesForm from "./ClassesForm";
import ClassesDataItem from "./ClassesDataItem";
import Dialog from "../../../components/Common/Dialog";

export default function Classes() {
    const { data: classes, setData: setClasses } = useContext(DataContext);
    const { school, teacher } = useContext(SchoolContext);

    const [modalFormVisible, setModalFormVisible] = useState(false);
    const [deleteDiaglogVisible, setDeleteDiaglogVisible] = useState(false);

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [className, setClassName] = useState('');
    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    useFocusEffect(useCallback(() => {
        (async () => (
            setClasses(await getClasses(school.id))
        ))()
    }, []));

    useEffect(() => {
        if (toggleEditForm) {
            onNameErrorResolve();
            setModalFormVisible(true);
        }
    }, [toggleEditForm])

    const removeClassById = (id) => {
        setClasses(c => {
            const selectedIdx = c.findIndex(x => x.id === id);
            return c.slice(0, selectedIdx).concat(c.slice((selectedIdx + 1)));
        });
    }

    const addButtonHandler = () => setModalFormVisible(true);

    const editButtonHandler = async (classObj) => {
        // open modal form (loading state)
        setClassName(null); // cause of loading animation
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

        setClasses(c => {
            const selectedIdx = c.findIndex(x => x.id === classObj.id);
            const newClasses = c.slice();
            newClasses[selectedIdx] = newClassObj;
            return newClasses;
        })

        setSelectedClass(newClassObj);

        setClassName(newClassObj.name);
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

        setSelectedClass(newClassObj);
    }

    const deleteClassHanlder = async () => {
        await deleteClass(school.id, selectedClass.id);
        removeClassById(selectedClass.id);
    }

    const submitHandler = async () => {
        const res = toggleEditForm
            ? await editClass(school.id, { id: selectedClass.id, name: className })
            : await createClass(school.id, className);

        setClasses(res);
    }

    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        setClassName('');
        setInputStatuses(getDefaultInputStatuses());
        setToggleEditForm(false);
        setSelectedClass(null);
    }

    const onNameChange = (value) => setClassName(value);

    const onNameError = () => setInputInvalid('className');

    const onNameErrorResolve = () => setInputValid('className');

    const setInputValid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.VALID);
    const setInputInvalid = (inputName) => updateInputStatus(inputStatuses, setInputStatuses, inputName, FORM_STATUS.INVALID);

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
                            value={className}
                            onInputChange={onNameChange}
                            onInputError={onNameError}
                            onInputErrorResolve={onNameErrorResolve}
                        />

                        <Dialog
                            title='Are you sure you want to delete {this.class}?'
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