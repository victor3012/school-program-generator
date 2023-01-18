import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS, updateInputStatus } from "../../services/util";
import { createClass, getClasses } from "../../services/schools";
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
import OptionsMenu from "../../components/Common/OptionsMenu/OptionsMenu";
import Option from "../../components/Common/OptionsMenu/Option";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";

export default function Classes() {
    const { data: classes, setData: setClasses } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);

    const [className, setClassName] = useState('');
    const [inputStatuses, setInputStatuses] = useState(getDefaultInputStatuses());

    useFocusEffect(useCallback(() => {
        (async () => (
            setClasses(await getClasses(school.id))
        ))()
    }, []));

    const addButtonHandler = () => setCreateModalVisible(true);

    const editButtonHandler = (classRef) => {
        //fetch by id -> ....

        setClassName(classRef.name);

        onNameErrorResolve();

        setCreateModalVisible(true);
    }

    const submitHandler = async () => {
        const res = await createClass(school.id, className);

        setClasses(res);
    }
    const errorHandler = (error) => alert(error.message);

    const resetHandler = () => {
        setInputStatuses(getDefaultInputStatuses());
        setClassName('');
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
                <ResponsiveModal
                    visible={createModalVisible} setVisible={setCreateModalVisible}
                    onSubmit={submitHandler}
                    onError={errorHandler}
                    onReset={resetHandler}
                    inputStatuses={inputStatuses}
                    containerStyle={modalFormStyles.responsiveModal}
                >
                    <Form inputStatuses={inputStatuses} style={modalFormStyles.form}>
                        <Input label='Class name'
                            required
                            value={className}
                            validator={validators.room}
                            onChange={onNameChange}
                            onError={onNameError}
                            onErrorResolve={onNameErrorResolve}
                        />
                    </Form>
                </ResponsiveModal>

                <DataList
                    data={classes}
                    actions={{ edit: editButtonHandler }}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={DataItem}
                />
            </>
            :
            <Loader />
    )
}

function DataItem({ data, actions }) {
    return (
        <DataItemContainer key={data.id}>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{data.name}</Text>
            <OptionsMenu containerStyle={styles.optionsButton}>
                <Option onPress={() => actions.edit(data)}>
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
    name: {
        flex: 3
    },
    optionsButton: {
        flex: 1
    }
})


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