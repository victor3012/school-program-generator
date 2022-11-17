import { useCallback, useContext } from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';

import SchoolStack from '../School/School';
import WelcomePage from "./WelcomePage";
import Schools from "./Schools";

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation, route }) {
    useFocusEffect(useCallback(() => {
        const currentScreen = getFocusedRouteNameFromRoute(route);

        if (currentScreen == 'School'
            || currentScreen == 'WelcomePage') {
            return;
        }

        navigation.setOptions({ title: "Schools", headerTitle: 'Schools' })
    }, [navigation, route]))


    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'vertical' }} >
            <Stack.Screen name='Schools' component={Home} />
            <Stack.Screen name='School' component={SchoolStack} />
        </ Stack.Navigator >
    );
}

function Home() {
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
