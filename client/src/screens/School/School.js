import { useCallback, useContext, useEffect } from "react";
import { ScrollView, Dimensions, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SchoolContext, SchoolProvider } from '../../contexts/SchoolContext'
import { DataProvider } from '../../contexts/DataContext'
import styleVar from "../../styles/styleVar";
import Loader from "../../components/Common/Loader";
import Teachers from "./Teachers/Teachers";
import Rooms from "./Rooms/Rooms";
import Subjects from "./Subjects/Subjects";
import Classes from "./Classes/Classes";
import SchoolIcon from "../../components/Icons/SchoolIcon";
import TeacherIcon from "../../components/Icons/TeacherIcon";
import ClassroomIcon from "../../components/Icons/ClassroomIcon";
import SchoolSubjectIcon from "../../components/Icons/SchoolSubjectIcon";
import PeopleGroupIcon from "../../components/Icons/PeopleGroupIcon";


import MaterialCommunityIcon from "../../components/Icons/Icon";
import SchoolInfo from "./SchoolInfo/SchoolInfo";

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
        <ScreenComponent title='Teachers' containerStyle={styles.centeredContainer} {...props}>
            <Teachers />
        </ScreenComponent >
    )
    const RoomsComponent = (props) => (
        <ScreenComponent title='Rooms' containerStyle={styles.centeredContainer} {...props}>
            <Rooms />
        </ScreenComponent >
    )
    const SchoolComponent = (props) => (
        <ScreenComponent {...props}>
            <SchoolInfo />
        </ScreenComponent>
    )

    const SubjectsComponent = (props) => (
        <ScreenComponent title='Subjects' containerStyle={styles.centeredContainer} {...props}>
            <Subjects />
        </ScreenComponent >
    )
    const ClassesComponent = (props) => (
        <ScreenComponent title='Classes' containerStyle={styles.centeredContainer} {...props}>
            <Classes />
        </ScreenComponent >
    )

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarShowLabel: isWideViewport }}
            sceneContainerStyle={{ flex: 1 }}>
            <Tab.Screen
                name="Teachers"
                options={{
                    tabBarIcon: ({ focused }) => <TeacherIcon
                        {...(focused || { color: styleVar.gray })} />,
                    tabBarItemStyle: {
                        flex: 1
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={TeachersComponent} />
            <Tab.Screen
                name="Rooms"
                options={{
                    tabBarIcon: ({ focused }) => <ClassroomIcon
                        {...(focused || { color: styleVar.gray })} />,
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
                        {...(focused || { color: styleVar.gray })} />,
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
                    tabBarIcon: ({ focused }) => <SchoolSubjectIcon
                        {...(focused || { color: styleVar.gray })} />,
                    tabBarItemStyle: {
                        flex: 1,
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={SubjectsComponent} />
            <Tab.Screen
                name="Classes"
                options={{
                    tabBarIcon: ({ focused }) => <PeopleGroupIcon
                        {...(focused || { color: styleVar.gray })} />,
                    tabBarItemStyle: {
                        flex: 1,
                    }
                }}
                initialParams={{ id: route.params.id }}
                component={ClassesComponent} />
        </Tab.Navigator>
    )
}

function ScreenComponent({
    navigation,
    children,
    title,
    navOptions,
    containerStyle
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
                <ScrollView contentContainerStyle={[{ padding: 5, flex: 1 }, containerStyle]}>
                    {children}
                </ScrollView>
            </DataProvider>
    )
}

const styles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})