import { useFocusEffect, useLinkTo } from "@react-navigation/native";
import { Text, View, StyleSheet, Platform } from "react-native";
import Separator from "../../components/Common/Separator";

import globalStyles from "../../styles/globalStyles";
import styleVar from "../../styles/styleVar";

import PressableBox from "../../components/Common/PressableBox";
import CreateSchool from "./CreateSchool";
import { useCallback, useState } from "react";
import { getSchools } from "../../services/schools";
import TeacherIcon from "../../components/Icons/TeacherIcon";
import ClassroomIcon from "../../components/Icons/ClassroomIcon";

export default function Schools() {
    const linkTo = useLinkTo();
    const [schools, setSchools] = useState([]);

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const res = await getSchools();
                setSchools(res);
            } catch (err) {
                alert(err.message);
            }
        })()
    }, []))

    return (
        <View>
            <Text style={[globalStyles.text, styles.subHeading]}>My schools</Text>

            <Separator />

            <View style={styles.container}>
                {schools.map(school =>
                    <PressableBox key={school.id} onPress={() => linkTo(`/schools/${school.id}`)}>
                        <>
                            <Text selectable={false} adjustsFontSizeToFit={true} style={[globalStyles.text, { textAlign: 'center' }]}>
                                {school.name}
                            </Text>

                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <TeacherIcon
                                        size={styleVar.smallIconSize}
                                        color={styleVar.gray} />
                                    <Text selectable={false} style={styles.infoText}>
                                        {school.teachersCount}
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <ClassroomIcon
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
                <CreateSchool />
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
        marginLeft: 5,
        fontSize: styleVar.smallFontSize,
        color: styleVar.gray
    }
});
