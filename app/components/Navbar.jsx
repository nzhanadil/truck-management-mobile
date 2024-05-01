import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { Platform } from 'react-native';
import { Trucks } from '../screens';

const DashboardRoute = () => <Text>DashboardRoute</Text>;
const ManagementRoute = () => <Text>ManagementRoute</Text>;
const DriversRoute = () => <Text>DriversRoute</Text>;
const TrucksRoute = () => <Text>TrucksRoute</Text>;
const TrailersRoute = () => <Text>TrailersRoute</Text>;
const SettingsRoute = () => <Text>SettingsRoute</Text>;

const Navbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'managers', title: 'Managers', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
    { key: 'drivers', title: 'Drivers', focusedIcon: 'card-account-details', unfocusedIcon: 'card-account-details-outline' },
    { key: 'trucks', title: 'Trucks', focusedIcon: 'truck', unfocusedIcon: 'truck-outline' },
    { key: 'trailers', title: 'Trailers', focusedIcon: 'truck-trailer', unfocusedIcon: 'truck-trailer' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: DashboardRoute,
    managers: ManagementRoute,
    drivers: DriversRoute,
    trucks: Trucks,
    trailers: TrailersRoute,
    settings: SettingsRoute
  });

  return (
    <BottomNavigation
      barStyle={{height: Platform.OS === 'ios' ? 90 : 80}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navbar;