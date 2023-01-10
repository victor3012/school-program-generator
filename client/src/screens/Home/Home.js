import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

import WelcomePage from "./WelcomePage";
import Schools from "./Schools";

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    return (
        isAuth
            ? <View style={styles.container}>
                <Schools />
            </View>
            : <WelcomePage />
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    }
});
