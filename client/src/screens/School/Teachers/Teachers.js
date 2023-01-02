import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { DataContext } from "../../../contexts/DataContext";
import { getTeachers } from "../../../services/schools";
import { TEACHER_ROLES_NAMES } from "../../../services/util";
import globalStyles from "../../../styles/globalStyles";
import styleVar from "../../../styles/styleVar";
import Loader from "../../../components/Common/Loader";
import DataItemContainer from "../DataItemContainer";
import DataList from "../DataList";
import TeachersForm from "./TeachersForm";
import OptionsMenu from "../../../components/Common/OptionsMenu/OptionsMenu";
import Option from "../../../components/Common/OptionsMenu/Option";
import DeleteIcon from "../../../components/Icons/DeleteIcon";
import EditIcon from "../../../components/Icons/EditIcon";

export default function Teachers() {
    const { data: teachers, setData: setTeachers } = useContext(DataContext);
    const { school } = useContext(SchoolContext);
    const [createModalVisible, setCreateModalVisible] = useState(false);

    useFocusEffect(useCallback(() => {
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
                />
            </>
            :
            <Loader />
    )
}

function DataItem({ data }) {
    return (
        <DataItemContainer style={{ cursor: 'default' }}>
            <Text style={[globalStyles.text, styles.nonselectable, styles.role]}>{TEACHER_ROLES_NAMES[data.role] || data.role}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.name]}>{getTeacherName(data)}</Text>
            <OptionsMenu containerStyle={styles.optionsButton}>
                <Option>
                    <Text style={[globalStyles.text, { fontSize: styleVar.smallFontSize }]}>
                        Email
                    </Text>
                    <Text style={[globalStyles.text, { color: styleVar.gray, fontSize: styleVar.smallFontSize }]}>
                        {data.email}
                    </Text>
                </Option>
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
    role: {
        flex: 1,
        color: styleVar.gray
    },
    name: {
        flex: 1.5
    },
    optionsButton: {
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