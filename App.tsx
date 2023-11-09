import React from 'react';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import { persistor } from './src/store/config';
import store from './src/store/config';
import ExampleStackNavigator from './src/navigation/ExampleStackNavigator';

const lightTheme = {
  dark: false,
  colors: {
    primary: '#ff2d55',
    background: '#fff',
    card: '#e0e0e0',
    text: '#040404',
    border: '#c7c7cc',
    notification: '#ff443a',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#ff2d55',
    background: '#000',
    card: '#c0c0c0',
    text: '#fff',
    border: '#c7c7cc',
    notification: '#ff443a',
  },
};

function App(): JSX.Element {
  const { colorScheme } = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={colorScheme === 'dark' ? darkTheme : lightTheme}
        >
          <ExampleStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
