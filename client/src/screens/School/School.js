import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import WelcomePage from "../Home/WelcomePage";
import { isAdmin } from '../../mockdata';
import styleVar from "../../styles/styleVar";
import globalStyles from "../../styles/globalStyles";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLinkTo } from "@react-navigation/native";
import { get } from "../../services/api";
import { getSchoolById } from "../../services/schools";
import OpacityButton from "../../components/OpacityButton";

const Tab = createBottomTabNavigator();

export default function SchoolStack({ route, navigation }) {
    const linkTo = useLinkTo();
    const [school, setSchool] = useState({});

    useEffect(() => {
        navigation.getParent().setOptions({ headerRight: AllSchoolsButton })

        return () => navigation.getParent().setOptions({ headerRight: () => null })
    }, [navigation])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const res = await getSchoolById(route.params.id);
                setSchool(res);
            } catch {
                setSchool({});
                linkTo('/schools');
            }
        })()
    }, [route]))

    const Teachers = (props) => <Component title='Teachers' school={school} {...props} />
    const Rooms = (props) => <Component title='Rooms' school={school} {...props} />

    const SchoolComponent = (props) => <School school={school} {...props} />

    const Subjects = (props) => <Component title='Subjects' school={school} {...props} />
    const Requests = (props) => <Component title='Requests' school={school} {...props} />

    const AllSchoolsButton = () => {
        return (
            <OpacityButton
                onPress={() => navigation.navigate('Home', { screen: 'Schools' })}
                textStyle={{ color: styleVar.blue }}
                style={{
                    backgroundColor: styleVar.white
                }}>
                All Schools
            </OpacityButton >
        )
    }

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
                component={Teachers} />
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
                component={Rooms} />
            <Tab.Screen
                name="SchoolInfo"
                options={{
                    tabBarLabel: 'School',
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
                component={SchoolComponent} />
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
                component={Subjects} />
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
                component={Requests} />
        </Tab.Navigator>
    )
}

function School({ route, navigation, school }) {

    useFocusEffect(useCallback(() => {
        navigation
            .getParent()
            .getParent()
            .setOptions({ title: school.name, headerTitle: school.name })
    }, []))

    return (
        <>
            <Text>
                {school.name} {route.params?.id}
            </Text>
        </>
    )
}

function Component({ navigation, route, title, school }) {
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

