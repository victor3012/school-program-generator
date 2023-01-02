import { useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Entypo'

import { SchoolContext } from "../../contexts/SchoolContext";
import { DataContext } from "../../contexts/DataContext";
import { FORM_STATUS } from "../../services/util";
import { createRoom, getRooms } from "../../services/schools";
import validators from "./validators";
import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";
import Loader from "../../components/Common/Loader";
import DataItemContainer from "./DataItemContainer";
import DataList from "./DataList";
import ResponsiveModal from "../../components/Common/ResponsiveModal";
import Input from "../../components/Common/Input";

export default function Rooms() {
    const { data: rooms, setData: setRooms } = useContext(DataContext);
    const { school } = useContext(SchoolContext);

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [status, setStatus] = useState(FORM_STATUS.DEFAULT);

    useFocusEffect(useCallback(() => {
        (async () => {
            const res = await getRooms(school.id);
            setRooms(res);
        })()
    }, []));

    return (
        rooms
            ?
            <DataList
                data={rooms}
                filterCallback={filterCallback}
                addButtonShown={false}
                DataItem={DataItem}
            />
            :
            <Loader />
    )
}

function DataItem({ data }) {
    return (
        <DataItemContainer>
            <Text style={[globalStyles.text, styles.nonselectable, styles.requestedBy]}>{data.name}</Text>
            <Text style={[globalStyles.text, styles.nonselectable, styles.title]}>{data.name}</Text>
            <View style={styles.buttonsContainer}>
                <Icon size='large' name='check' />
                <Icon size='large' name='circle-with-cross' />
                <Icon size='large' name='dots-three-horizontal' />
            </View>
        </DataItemContainer>
    )
}

const styles = StyleSheet.create({
    nonselectable: {
        userSelect: 'none'
    },
    requestedBy: {
        flex: 1
    },
    title: {
        flex: 1
    },
    buttonsContainer: {
        flex: 1
    }
})


function filterCallback(query, roomName) {
    return roomName.name
        .toLocaleLowerCase()
        .includes(
            query
                .trim()
                .toLocaleLowerCase());
}