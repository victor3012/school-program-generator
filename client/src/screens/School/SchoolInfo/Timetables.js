import { useCallback, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useFocusEffect, useLinkTo } from "@react-navigation/native";

import globalStyles from "../../../styles/globalStyles";
import styleVar from "../../../styles/styleVar";

import Separator from "../../../components/Common/Separator";
import PressableBox from "../../../components/Common/PressableBox";
import CreateTimetable from "./CreateTimetable";
// import { getTimetables } from "../../../services/schools";

export default function Timetables() {
    const linkTo = useLinkTo();
    const [timetables, setTimetables] = useState([]);

    useFocusEffect(useCallback(() => {
        /*
        (async () => {
            try {
                const res = await getTimetables();
                setTimetables(res);
            } catch (err) {
                alert(err.message);
            }
        })()
        */
    }, []))

    return (
        <View>
            <Text style={[globalStyles.text, styles.subHeading]}>Timetables</Text>

            <Separator />

            <View style={styles.container}>
                {timetables.map(timetable =>
                    <PressableBox key={timetable.id} onPress={() => linkTo(`timetables/${timetable.id}`)}>
                        <Text selectable={false} adjustsFontSizeToFit={true} style={[globalStyles.text, { textAlign: 'center' }]}>
                            {timetable.name}
                        </Text>
                    </PressableBox>
                )}
                <CreateTimetable />
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
    }
});
