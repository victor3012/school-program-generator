import 'react-native-gesture-handler';

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import Auth from './src/screens/Auth/Auth';
import HomeStack from './src/screens/Home/Home';
import styleVar from './src/styles/styleVar';
import OpacityButton from './src/components/OpacityButton';
import ProfileOverview from './src/components/ProfileOverview';
import ErrorBoundary from './src/components/ErrorBoundary';
import Loader from './src/components/Loader';

const Drawer = createDrawerNavigator();

const routeToTitle = {
  Login: 'Log in your account',
  SignUp: 'Create an account',
}

const linking = {
  config: {
    screens: {
      Home: '',
      Auth: {
        initialRouteName: 'profile',
        screens: {
          Login: 'login',
          SignUp: 'signup',
        },
      },
      Schools: '/schools',
      School: {
        path: '/schools/:id',
        screens: {
          SchoolInfo: '',
          Teachers: 'teachers',
          Rooms: 'rooms',
          Subjects: 'subjects',
          Requests: 'requests',
        }
      }
    }
  }
};

// Reanimated 2 causes unexpected errors, bugs --> <Drawer.Navigator useLegacyImplementation={true}>
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <View style={styles.container}>
          <DrawerNavigation />
        </View >
      </AuthProvider>
    </ErrorBoundary>
  );
}

function DrawerNavigation() {
  const authContext = useContext(AuthContext);

  const CustomDrawerComponent = (props) => <CustomDrawer authContext={authContext} {...props} />

  return (
    <NavigationContainer linking={linking} fallback={<Drawer.Screen name='Loading...' component={Loader} />}>
      <Drawer.Navigator
        drawerContent={CustomDrawerComponent}
        useLegacyImplementation={true}
        screenOptions={{ gestureHandlerProps: { hitSlop: 25 } }}>
        {authContext.authLoaded
          ?
          <>
            <Drawer.Screen name="Home" component={HomeStack}
              options={() => ({
                drawerIcon: ({ focused }) => <FontAwesome5Icon
                  name="school"
                  size={styleVar.mediumIconSize}
                  color={focused ? styleVar.blue : styleVar.gray} />,
                headerTitle: 'Schools',
              })} />

            {authContext.isAuth ||
              <Drawer.Screen options={({ route }) => ({
                drawerIcon: ({ focused }) => <AntDesignIcon
                  name='user'
                  size={styleVar.mediumIconSize}
                  color={focused ? styleVar.blue : styleVar.gray} />,
                drawerLabel: 'Profile',
                headerStyle: { backgroundColor: styleVar.blue },
                headerTitleStyle: { color: styleVar.white },
                headerTintColor: styleVar.white,
                headerTitle: routeToTitle[getFocusedRouteNameFromRoute(route)] || getFocusedRouteNameFromRoute(route) || routeToTitle.Login
              })} name="Auth" component={Auth} />
            }
          </>
          :
          <Drawer.Screen name='Loading...' component={Loader} />
        }

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function CustomDrawer({ authContext, ...props }) {
  const { isAuth, logout } = authContext;

  const logoutHandler = () => {
    logout();
    props.navigation.navigate('Home', { screen: 'Schools' })
  }

  return (
    <DrawerContentScrollView contentContainerStyle={[
      { height: '100%' },
      isAuth && { paddingTop: 0 }
    ]}>
      {isAuth &&
        <ProfileOverview user={authContext.user} />
      }

      <DrawerItemList {...props} />

      {isAuth &&
        <OpacityButton onPress={logoutHandler}
          style={{
            paddingVertical: 30,
            paddingHorizontal: 0,
            margin: 0,
            backgroundColor: styleVar.white,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTopWidth: 1,
            borderTopColor: styleVar.blueShadow
          }}
          textStyle={{ color: styleVar.blue }}>
          Logout
        </OpacityButton>
      }
    </DrawerContentScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVar.blue
  }
})