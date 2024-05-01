import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper';

import { store } from './app/store/store'
import { Signin, Signup, ResetPassword } from './app/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='signin'>
            <Stack.Screen name='signin' component={Signin} options={{headerShown: false}}/>
            <Stack.Screen name='signup' component={Signup} options={{headerShown: false}}/>
            <Stack.Screen name='resetpassword' component={ResetPassword} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
