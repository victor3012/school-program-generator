import { useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SchoolContext, SchoolProvider } from '../../contexts/SchoolContext'
import { DataProvider } from '../../contexts/DataContext'
import styleVar from "../../styles/styleVar";
import Loader from "../../components/Common/Loader";
import Teachers from "./Teachers/Teachers";
import Rooms from "./Rooms";
import Subjects from "./Subjects";
import { ScrollView, Dimensions } from "react-native";
import SchoolIcon from "../../components/Icons/SchoolIcon";

const WINDOW_WIDTH = Dimensions.get('window').width;
const isWideViewport = WINDOW_WIDTH > 600;


const Tab = createBottomTabNavigator();


export default function School(props) {
    return (
        <SchoolProvider>
            <SchoolStack {...props} />
        </SchoolProvider>
    )
}

function SchoolStack({ route, navigation }) {
    const { school, isSchoolLoading } = useContext(SchoolContext);

    useEffect(() => {
        if (!isSchoolLoading) {
            navigation.setOptions({ drawerItemStyle: { display: 'flex' }, drawerLabel: school.name });
        }
        
    }, [navigation, school, isSchoolLoading])

    const TeachersComponent = (props) => (
        <ScreenComponent title='Teachers' {...props}>
            <Teachers />
        </ScreenComponent>
    )
    const RoomsComponent = (props) => (
        <ScreenComponent title='Rooms' {...props}>
            <Rooms />
        </ScreenComponent>
    )
    const SchoolComponent = (props) => <ScreenComponent  {...props} />

    const SubjectsComponent = (props) => (
        <ScreenComponent title='Subjects' {...props}>
            <Subjects />
        </ScreenComponent>
    )
    const Requests = (props) => <ScreenComponent title='Requests' {...props} />

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarShowLabel: isWideViewport }}
            sceneContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%' }}>
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
                component={RoomsComponent} />
            <Tab.Screen
                name="SchoolInfo"
                options={{
                    tabBarLabel: 'School',
                    tabBarIcon: ({ focused }) => <SchoolIcon
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
                component={SubjectsComponent} />
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
                <ScrollView contentContainerStyle={{ padding: 5, flex: 1 }}>
                    {children}
                </ScrollView>
            </DataProvider>
    )
}

