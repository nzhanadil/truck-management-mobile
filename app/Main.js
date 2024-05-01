import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Signin, Signup, ResetPassword } from './screens';
import { Navbar } from './components';

const Stack = createNativeStackNavigator()

export default function Main() {
  const { currentUser } = useSelector(store => store.users)

  return (
    <NavigationContainer>
      { 
      currentUser 
      ? 
      <Navbar /> 
      :
      <Stack.Navigator initialRouteName='signin'>
        <Stack.Screen name='signin' component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name='signup' component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name='resetpassword' component={ResetPassword} options={{headerShown: false}}/>
      </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
