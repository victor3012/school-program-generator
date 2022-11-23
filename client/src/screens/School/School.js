import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SchoolContext, SchoolProvider } from '../../contexts/SchoolContext'
import { DataProvider } from '../../contexts/DataContext'
import styleVar from "../../styles/styleVar";
import OpacityButton from "../../components/Common/OpacityButton";
import Loader from "../../components/Common/Loader";
import Teachers from "./Teachers/Teachers";

const Tab = createBottomTabNavigator();

export default function SchoolStack({ route, navigation }) {
    useEffect(() => {
        navigation.getParent().setOptions({ headerRight: AllSchoolsButton })

        return () => navigation.getParent().setOptions({ headerRight: () => null })
    }, [navigation])

    const TeachersComponent = (props) => (
        <ScreenComponent title='Teachers' {...props}>
            <Teachers />
        </ScreenComponent>
    )
    const Rooms = (props) => <ScreenComponent title='Rooms' {...props} />
    const SchoolComponent = (props) => <ScreenComponent  {...props} />
    const Subjects = (props) => <ScreenComponent title='Subjects' {...props} />
    const Requests = (props) => <ScreenComponent title='Requests' {...props} />

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
        <SchoolProvider>
            <Tab.Navigator screenOptions={{ headerShown: false }} sceneContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
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
                    component={TeachersComponent} />
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
        </SchoolProvider>
    )
}

function ScreenComponent({
    navigation,
    children,
    title,
    navOptions
}) {
    const { school, isSchoolLoading } = useContext(SchoolContext);

    useFocusEffect(useCallback(() => {
        let headerTitle = 'Loading...';

        if (school) {
            headerTitle = `${school.name}${title ? ` | ${title}` : ''}`;
        }

        navigation
            .getParent()
            .getParent()
            .setOptions({
                headerTitle,
                ...navOptions
            })
    }, [school]))

    return (
        isSchoolLoading
            ? <Loader />
            :
            <DataProvider>
                {children}
            </DataProvider>
    )
}

