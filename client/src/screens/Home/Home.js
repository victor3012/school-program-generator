import { StyleSheet, View } from 'react-native';

import WelcomePage from "./WelcomePage";
// import Schools from "./Schools";  TODO

import styleVar from '../../styles/styleVar';
import globalStyles from '../../styles/globalStyles';

import { isAuth, isAdmin } from "../../mockdata";

export default function Home() {
    return (
        isAuth
            ? <View style={styles.container}>
                {/* <Schools /> */}
            </View>
            : <WelcomePage />
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    }
});
