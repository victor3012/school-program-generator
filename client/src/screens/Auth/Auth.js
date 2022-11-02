import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
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

export default function Auth() {
    const LoginComponent = useCallback((args) => {
        return <Login {...args} updateInputStatus={updateInputStatus} getContainerBorderTopColor={getContainerBorderTopColor} />
    }, [])

    const SignUpComponent = useCallback((args) => {
        return <SignUp {...args} updateInputStatus={updateInputStatus} getContainerBorderTopColor={getContainerBorderTopColor} />
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
        <Tab.Navigator>
            <Tab.Screen options={{
                ...options,
                tabBarIcon: () => <Icon name='login' size={styleVar.mediumIconSize} />,
                tabBarActiveTintColor: styleVar.blue
            }} name="Login" component={LoginComponent} />
            <Tab.Screen options={{
                ...options,
                tabBarLabel: 'Sign Up',
                tabBarIcon: () => <Icon name='adduser' size={styleVar.mediumIconSize} />
            }} name="SignUp" component={SignUpComponent} />
        </Tab.Navigator>
    )
}