import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import styleVar from "../../styles/styleVar";

import Login from "./Login";
import SignUp from "./SignUp";

const Tab = createBottomTabNavigator();

export default function Auth() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: styleVar.mediumFontSize }
        }}>
            <Tab.Screen options={{
                tabBarIcon: () => <Icon name='login' size={styleVar.mediumIconSize} />,
                tabBarActiveTintColor: styleVar.blue
            }} name="Login" component={Login} />
            <Tab.Screen options={{
                tabBarLabel: 'Sign Up',
                tabBarIcon: () => <Icon name='adduser' size={styleVar.mediumIconSize} />
            }} name="SignUp" component={SignUp} />
        </Tab.Navigator>
    )
}