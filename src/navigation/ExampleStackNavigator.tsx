import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ExampleScreen from '@screens/ExampleScreen';
import HomeExampleScreen from '@screens/HomeExampleScreen';
import { ExampleStackParamList } from '@navigation/types';

const Stack = createStackNavigator<ExampleStackParamList>();

const ExampleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name='HomeExample'
        component={HomeExampleScreen}
        options={({ route }) => ({ title: route.name })}
      />
      <Stack.Screen name='Example' component={ExampleScreen} />
    </Stack.Navigator>
  );
};

export default ExampleStackNavigator;
