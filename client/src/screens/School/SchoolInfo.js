import {  useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";

export default function SchoolInfo() {
    const { data: rooms, setData: setRooms } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    return (
        rooms
            ?
            <>
                
            </>
            :
            <Loader />
    )
}

const styles = StyleSheet.create({
})