import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { SchoolContext } from "../../../contexts/SchoolContext";
import { TEACHER_ROLES } from "../../../services/util";
import Timetables from "./Timetables";

export default function SchoolInfo() {
    const { school, teacher } = useContext(SchoolContext);

    return (
        <>
            {TEACHER_ROLES[teacher.role] >= TEACHER_ROLES.SYSTEM_ADMIN &&
                <Timetables />
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})