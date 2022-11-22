import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { getTeachers } from "../../../services/schools";
import { TEACHER_ROLES_NAMES } from "../../../services/util";
import globalStyles from "../../../styles/globalStyles";
import styleVar from "../../../styles/styleVar";
import Loader from "../../../components/Loader";
import DataItemContainer from "../DataItemContainer";
import DataList from "../DataList";
import TeachersForm from "./TeachersForm";

export default function TeachersDataList() {
    const { data: teachers, setData: setTeachers } = useContext(DataContext);
    const { school } = useContext(SchoolContext);
    const [createModalVisible, setCreateModalVisible] = useState(false);

    useFocusEffect(useCallback(() => {
        console.log('effect');

        (async () => {
            const res = await getTeachers(school.id);
            setTeachers(res);
        })()
    }, []));

    const addButtonHandler = () => {
        setCreateModalVisible(true);
    }

    return (
        teachers
            ?
            <>
                <TeachersForm visible={createModalVisible} setVisible={setCreateModalVisible} />

                <DataList
                    data={teachers}
                    filterCallback={filterCallback}
                    onAddButtonPress={addButtonHandler}
                    DataItem={DataItem}
                    options
                />
            </>
            :
            <Loader />
    )
}

function DataItem({ data }) {
    return (
        <DataItemContainer>
            <Text style={[globalStyles.text, styles.nonselectable, styles.role]}>{TEACHER_ROLES_NAMES[data.role] || data.role}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{getTeacherName(data)}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.stars]}>* * *</Text>
        </DataItemContainer>
    )
}

const styles = StyleSheet.create({
    nonselectable: {
        userSelect: 'none'
    },
    role: {
        flex: 1,
        color: styleVar.gray
    },
    name: {
        flex: 1.5
    },
    stars: {
        flex: 1
    }
})

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