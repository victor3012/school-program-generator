import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styleVar from "../../styles/styleVar";

import Login from "./Login";
import Register from "./Register";

const Tab = createBottomTabNavigator();

const options = {
    headerShown: false,
    tabBarLabelStyle: { fontSize: styleVar.mediumFontSize }
}

export default function Auth({ navigation, route }) {
    const setAuthTitle = useCallback((title) => {
        navigation.setParams({ title });
    }, []);

    const LoginComponent = useCallback((args) => {
        return <Login {...args} updateAuthTitle={() => setAuthTitle('Login')} />
    }, [])

    const RegisterComponent = useCallback((args) => {
        return <Register {...args} updateAuthTitle={() => setAuthTitle('Register')} />
    }, [])

    return (
        <Tab.Navigator sceneContainerStyle={styles.container}>
            <Tab.Screen options={{
                ...options,
                tabBarIcon: () => <Icon name='login' size={styleVar.mediumIconSize} />,
                tabBarActiveTintColor: styleVar.blue
            }} initialParams={{ title: 'Login' }}
                name="Login" component={LoginComponent} />
            <Tab.Screen options={{
                ...options,
                tabBarIcon: () => <Icon name='adduser' size={styleVar.mediumIconSize} />
            }} initialParams={{ title: 'Register' }}
                name="Register" component={RegisterComponent} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})