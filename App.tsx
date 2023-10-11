import React from 'react';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './src/store/config'
import ExampleStackNavigator from './src/navigation/ExampleStackNavigator';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ExampleStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
