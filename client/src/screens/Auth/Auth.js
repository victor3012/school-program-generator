import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styleVar from "../../styles/styleVar";

import Login from "./Login";
import SignUp from "./SignUp";
import { StyleSheet } from "react-native";
import LoginIcon from "../../components/Icons/LoginIcon";
import SignUpIcon from "../../components/Icons/SignUpIcon";

const Tab = createBottomTabNavigator();

export default function Auth() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen options={{
                tabBarLabelStyle: styles.label,
                tabBarIcon: ({ focused }) => <LoginIcon
                    {...(focused || { color: styleVar.gray })} />,
                tabBarActiveTintColor: styleVar.blue
            }} name="Login" component={Login} />
            <Tab.Screen options={{
                tabBarLabel: 'Sign Up',
                tabBarLabelStyle: styles.label,
                tabBarIcon: ({ focused }) => <SignUpIcon
                    {...(focused || { color: styleVar.gray })} />
            }} name="SignUp" component={SignUp} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 0
    }
})