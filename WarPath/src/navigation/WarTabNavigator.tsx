import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNav from '../components/BottomNav';
import MapScreen from '../screens/MapScreen';
import TrainOrcsScreen from '../screens/TrainOrcsScreen';

export type WarTabParamList = {
  MapTab: undefined;
  TrainTab: undefined;
};

const Tab = createBottomTabNavigator<WarTabParamList>();

export default function WarTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav tabProps={props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
      }}
    >
      <Tab.Screen name="MapTab" component={MapScreen} />
      <Tab.Screen name="TrainTab" component={TrainOrcsScreen} />
    </Tab.Navigator>
  );
}
