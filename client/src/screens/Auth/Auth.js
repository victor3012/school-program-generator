import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styleVar from "../../styles/styleVar";

import Login from "./Login";
import SignUp from "./SignUp";

const Tab = createBottomTabNavigator();

export default function Auth() {
    const LoginComponent = useCallback((args) => {
        return <Login {...args} updateInputStatus={updateInputStatus} />
    }, [])

    const SignUpComponent = useCallback((args) => {
        return <SignUp {...args} updateInputStatus={updateInputStatus} />
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

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: styleVar.mediumFontSize }
        }}>
            <Tab.Screen options={{
                tabBarIcon: () => <Icon name='login' size={styleVar.mediumIconSize} />,
                tabBarActiveTintColor: styleVar.blue
            }} name="Login" component={LoginComponent} />
            <Tab.Screen options={{
                tabBarLabel: 'Sign Up',
                tabBarIcon: () => <Icon name='adduser' size={styleVar.mediumIconSize} />
            }} name="SignUp" component={SignUpComponent} />
        </Tab.Navigator>
    )
}