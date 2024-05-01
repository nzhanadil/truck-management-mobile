import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import { store } from './app/store/store'
import Main from './app/Main';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' && StatusBar.currentHeight}} />
        <Main />
      </PaperProvider>
    </Provider>
  );
}
