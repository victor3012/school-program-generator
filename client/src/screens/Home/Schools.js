import { useLinkTo } from "@react-navigation/native";
import { Text, View, Pressable, StyleSheet, Platform } from "react-native";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Separator from "../../components/Separator";

import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

import { schools, isAdmin, isAuth } from "../../mockdata";
import PressableBox from "../../components/PressableBox";
import CreateSchool from "./CreateSchool";

export default function Schools() {
    const linkTo = useLinkTo();

    return (
        <View>
            <Text style={[globalStyles.text, styles.subHeading]}>My schools</Text>

            <Separator />

            <View style={styles.container}>
                {schools.map(school =>
                    <PressableBox key={school.id} onPress={() => linkTo({ screen: 'School', params: { id: school.id } })}>
                        <>
                            <Text selectable={false} adjustsFontSizeToFit={true} style={[globalStyles.text, { textAlign: 'center' }]}>
                                {school.name}
                            </Text>

                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <AntDesignIcon name="user"
                                        size={styleVar.smallIconSize}
                                        color={styleVar.gray} />
                                    <Text selectable={false} style={styles.infoText}>
                                        {school.teachersCount}
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <MaterialIcon name="meeting-room"
                                        size={styleVar.smallIconSize}
                                        color={styleVar.gray} />
                                    <Text selectable={false} style={styles.infoText}>
                                        {school.roomsCount}
                                    </Text>
                                </View>
                            </View>
                        </>
                    </PressableBox>
                )}
                <CreateSchool isAdmin={isAdmin} />
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    subHeading: {
        fontSize: 1.2 * styleVar.largeFontSize
    },
    container: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: 'wrap'
    },
    schoolBox: {
        padding: 15,
        width: Platform.OS === 'web' ? 300 : '100%',
        marginHorizontal: Platform.OS === 'web' ? 20 : 0,
        marginVertical: Platform.OS === 'web' ? 20 : 10,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        fontSize: styleVar.largeFontSize,
    },
    infoContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10
    },
    infoText: {
        fontSize: styleVar.smallFontSize,
        color: styleVar.gray
    }
});
