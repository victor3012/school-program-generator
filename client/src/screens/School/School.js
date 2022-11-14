import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import WelcomePage from "../Home/WelcomePage";
import { isAdmin } from '../../mockdata';
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "../../services/api";

const Tab = createBottomTabNavigator();

const school = {
    name: 'PMG Valeri Lilov',
    content: 'Welcome to the school of the chess master Valeri "The Tiger" Lilov!)'
}


export default function SchoolStack({ route }) {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Teachers"
                options={{
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="chalkboard-teacher"
                        size={styleVar.mediumIconSize}
                        color={focused ? styleVar.blue : styleVar.gray} />,
                    tabBarItemStyle: {
                        flex: 1
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={(props) => <Component {...props} title='Teachers' />} />
            <Tab.Screen
                name="Rooms"
                options={{
                    tabBarIcon: ({ focused }) => <MaterialCommunityIcon name="google-classroom"
                        size={styleVar.mediumIconSize}
                        color={focused ? styleVar.blue : styleVar.gray} />,
                    tabBarItemStyle: {
                        flex: 1,
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={(props) => <Component {...props} title='Rooms' />} />
            <Tab.Screen
                name="SchoolInfo"
                options={{
                    tabBarLabel: school.name,
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="school"
                        size={styleVar.mediumIconSize}
                        color={focused ? styleVar.blue : styleVar.gray} />,
                    tabBarItemStyle: {
                        flex: 1.5
                    },
                    tabBarLabelStyle: {
                        fontSize: styleVar.mediumFontSize
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={School} />
            <Tab.Screen
                name="Subjects"
                options={{
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="book"
                        size={styleVar.mediumIconSize}
                        color={focused ? styleVar.blue : styleVar.gray} />,
                    tabBarItemStyle: {
                        flex: 1,
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={(props) => <Component {...props} title='Subjects' />} />
            <Tab.Screen
                name="Requests"
                options={{
                    tabBarIcon: ({ focused }) => <MaterialCommunityIcon name="order-bool-descending-variant"
                        size={styleVar.mediumIconSize}
                        color={focused ? styleVar.blue : styleVar.gray} />,
                    tabBarItemStyle: {
                        flex: 1
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={(props) => <Component {...props} title='Requests' />} />
        </Tab.Navigator>
    )
}

function School({ route, navigation }) {
    const [content, setContent] = useState([]);

    useFocusEffect(useCallback(() => {
        navigation
            .getParent()
            .getParent()
            .setOptions({ title: school.name, headerTitle: school.name })
    }, []))

    useFocusEffect(useCallback(() => {
        get("http://localhost:8083/api/schools")
    }, []));

    return (
        <>
            <Text>
                {school.content} {route.params?.id}
            </Text>
        </>
    )
}

function Component({ navigation, route, title }) {
    useFocusEffect(useCallback(() => {
        navigation
            .getParent()
            .getParent()
            .setOptions({ headerTitle: `${school.name} | ${title}` })
    }, []))

    return (
        <Text>{title} {route.params?.id}</Text>
    )
}