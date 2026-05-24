import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutScreen from '../screens/AboutScreen';
import BattleScreen from '../screens/BattleScreen';
import BattleWonScreen from '../screens/BattleWonScreen';
import CreateTribeScreen from '../screens/CreateTribeScreen';
import HomeScreen from '../screens/HomeScreen';
import HubScreen from '../screens/HubScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VictoryScreen from '../screens/VictoryScreen';
import WarTabNavigator from './WarTabNavigator';

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  About: undefined;
  Hub: undefined;
  CreateTribe: undefined;
  WarTabs: undefined;
  Battle: { tribeId: string; locationId: string };
  BattleWon: { tribeId: string; locationId: string };
  Victory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen name="Hub" component={HubScreen} />
      <Stack.Screen name="CreateTribe" component={CreateTribeScreen} />
      <Stack.Screen name="WarTabs" component={WarTabNavigator} />
      <Stack.Screen name="Battle" component={BattleScreen} />
      <Stack.Screen name="BattleWon" component={BattleWonScreen} />
      <Stack.Screen name="Victory" component={VictoryScreen} />
    </Stack.Navigator>
  );
}
