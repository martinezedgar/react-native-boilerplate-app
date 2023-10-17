import React from 'react';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { persistor } from './src/store/config';

import store from './src/store/config'
import ExampleStackNavigator from './src/navigation/ExampleStackNavigator';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ExampleStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;
