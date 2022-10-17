import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styleVar from "../../styles/styleVar";

import Login from "./Login";
import SignUp from "./SignUp";

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
        return <Login {...args} updateAuthTitle={() => setAuthTitle('Login')} updateInputStatus={updateInputStatus} getContainerBorderTopColor={getContainerBorderTopColor} />
    }, [])

    const SignUpComponent = useCallback((args) => {
        return <SignUp {...args} updateAuthTitle={() => setAuthTitle('Sign up')} updateInputStatus={updateInputStatus} getContainerBorderTopColor={getContainerBorderTopColor} />
    }, [])

    const updateInputStatus = (inputStatuses, setInputStatuses, key, value) => {
        if (inputStatuses[key] === value) {
            return;
        }

        setInputStatuses((oldInputStatuses) => {
            let newInputStatuses = {};
            Object.assign(newInputStatuses, oldInputStatuses);
            newInputStatuses[key] = value;

            return newInputStatuses;
        })
    }

    const getContainerBorderTopColor = (formStatus) => {
        if (formStatus == 2) {
            return styleVar.red;
        }

        if (formStatus == 1) {
            return styleVar.blue;
        }

        return styleVar.blueShadow;
    }

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
                tabBarLabel: 'Sign Up',
                tabBarIcon: () => <Icon name='adduser' size={styleVar.mediumIconSize} />
            }} initialParams={{ title: 'Sign up' }}
                name="SignUp" component={SignUpComponent} />
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