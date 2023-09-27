import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ExampleStackNavigator from './src/navigators/ExampleStackNavigator';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ExampleStackNavigator />
    </NavigationContainer>
  )
}

export default App;
