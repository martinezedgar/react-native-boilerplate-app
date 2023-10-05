import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import ExampleStackNavigator from './src/navigation/ExampleStackNavigator';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ExampleStackNavigator />
    </NavigationContainer>
  )
}

export default App;
