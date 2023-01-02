import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS } from "../../services/util";
import { createSubject, getSubjects } from "../../services/schools";
import validators from "./validators";
import globalStyles from "../../styles/globalStyles";
import Loader from "../../components/Common/Loader";
import DataItemContainer from "./DataItemContainer";
import DataList from "./DataList";
import ResponsiveModal from "../../components/Common/ResponsiveModal";
import Input from "../../components/Common/Input";

export default function Subjects() {
    const { data: subjects, setData: setSubjects } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [status, setStatus] = useState(FORM_STATUS.DEFAULT);

    useFocusEffect(useCallback(() => {
        (async () => {
            const res = await getSubjects(school.id);
            setSubjects(res);
        })()
    }, []));

    const addButtonHandler = () => setCreateModalVisible(true);
    const submitHandler = async () => {
        const res = await createSubject(school.id, subjectName);
        setSubjects(res);
    }
    const errorHandler = (error) => alert(error.message);
    const resetHandler = () => setSubjectName('');
    const changeHandler = (value) => setSubjectName(value);
    const onInputError = () => setStatus(FORM_STATUS.INVALID);
    const onInputErrorResolve = () => setStatus(FORM_STATUS.VALID);

    return (
        subjects
            ?
            <>
                <ResponsiveModal title='New Subject'
                    visible={createModalVisible} setVisible={setCreateModalVisible}
                    onSubmit={submitHandler}
                    onError={errorHandler}
                    onReset={resetHandler}
                    inputStatuses={{ status }}
                >
                    <Input label='Subject name'
                        showError={false}
                        required
                        value={subjectName}
                        validator={validators.room}
                        onChange={changeHandler}
                        onError={onInputError}
                        onErrorResolve={onInputErrorResolve}
                    />
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


function filterCallback(query, subject) {
    return subject.name
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}