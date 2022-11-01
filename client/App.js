import 'react-native-gesture-handler';

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign'

import Auth from './src/screens/Auth/Auth';
import Home from './src/screens/Home/Home';
import STEM from './src/screens/STEM';
import styleVar from './src/styles/styleVar';
import CreateSchool from './src/screens/CreateSchool';

const Drawer = createDrawerNavigator();

const routeToTitle = {
  Login: 'Log in your account',
  SignUp: 'Create an account',
}

const linking = {
  config: {
    screens: {
      Home: '/home',
      Auth: {
        initialRouteName: 'profile',
        screens: {
          Login: 'login',
          SignUp: 'signup',
        },
      },
      STEM: '/stem',
    }
  },
};

// Reanimated 2 causes unexpected errors, bugs --> <Drawer.Navigator useLegacyImplementation={true}>
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Drawer.Navigator useLegacyImplementation={true} screenOptions={{ gestureHandlerProps: { hitSlop: 25 } }}>
          <Drawer.Screen name="Home" component={Home}
            options={{
              drawerIcon: () => <Icon name='home' size={styleVar.mediumIconSize} />
            }} />
          <Drawer.Screen options={({ route }) => ({
            drawerIcon: () => <Icon name='user' size={styleVar.mediumIconSize} />,
            drawerLabel: 'Profile',
            headerStyle: { backgroundColor: styleVar.blue },
            headerTitleStyle: { color: styleVar.white },
            headerTintColor: styleVar.white,
            headerTitle: routeToTitle[getFocusedRouteNameFromRoute(route)] || getFocusedRouteNameFromRoute(route) || routeToTitle.Login
          })} name="Auth" component={Auth} />
          <Drawer.Screen name="STEM" component={CreateSchool}
            options={{ drawerIcon: () => <Icon name='table' size={styleVar.mediumIconSize} /> }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVar.blue
  },
})