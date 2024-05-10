import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './app/store/store'
import Main from './app/Main';
import { Alert, AssignDialog, CustomDialog, UnassignDialog } from './app/components';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Main />
          <Alert />
          <CustomDialog />
          <UnassignDialog />
          <AssignDialog />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
