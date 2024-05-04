import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Signin, Signup, ResetPassword, Trucks, Truck } from './screens';
import { BottomNavigation, Navbar } from './components';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator()

const Home = () => <Text>Home</Text>;
const ManagementRoute = () => <Text>ManagementRoute</Text>;
const DriversRoute = () => <Text>DriversRoute</Text>;
const TrailersRoute = () => <Text>TrailersRoute</Text>;
const SettingsRoute = () => <Text>SettingsRoute</Text>;

export default function Main() {
  const { currentUser } = useSelector(store => store.users)
  const insets = useSafeAreaInsets();


  return (
    <View style={{marginTop: insets.top, flexGrow: 1}} className='bg-primary-3'>
      {currentUser ?
      <Stack.Navigator initialRouteName='signin'>
        <Stack.Screen name='signin' component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name='signup' component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name='resetpassword' component={ResetPassword} options={{headerShown: false}}/>
      </Stack.Navigator>
      :
      <>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='Managers' component={ManagementRoute} options={{headerShown: false}}/>
        <Stack.Screen name='Trucks' component={Trucks} options={{headerShown: false}}/>
        <Stack.Screen name='Truck' component={Truck} options={{headerShown: false}}/>
        <Stack.Screen name='Drivers' component={DriversRoute} options={{headerShown: false}}/>
        <Stack.Screen name='Trailers' component={TrailersRoute} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={SettingsRoute} options={{headerShown: false}}/>
      </Stack.Navigator>
      <BottomNavigation />
      </>  
      } 
    </View>
  );
}
