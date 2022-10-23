import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign'

import Auth from './src/screens/Auth/Auth';
import CatModal from './src/screens/CatModal';
import STEM from './src/screens/STEM';
import styleVar from './src/styles/styleVar';

const Drawer = createDrawerNavigator();

// Reanimated 2 causes unexpected errors, bugs --> <Drawer.Navigator useLegacyImplementation={true}>
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation={true}>
          <Drawer.Screen name="Cat Modal" component={CatModal}
            options={{ drawerIcon: () => <Icon name='home' size={styleVar.mediumIconSize} /> }} />
          <Drawer.Screen options={({ route }) => ({
            drawerIcon: () => <Icon name='user' size={styleVar.mediumIconSize} />,
            drawerLabel: 'Profile',
            headerStyle: { backgroundColor: styleVar.blue },
            headerTitleStyle: { color: styleVar.white },
            headerTintColor: styleVar.white,
            headerTitle: route.params?.title || 'Authentication'
          })} initialParams={{ title: 'Authentication' }} name="Auth" component={Auth} />
          <Drawer.Screen name="STEM" component={STEM}
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