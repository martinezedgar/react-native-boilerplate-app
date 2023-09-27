import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ExampleScreen from '../screens/ExampleScreen'
import HomeExampleScreen from '../screens/HomeExampleScreen'
import { ExampleStackParamList } from './types'


const Stack = createNativeStackNavigator<ExampleStackParamList>()

const ExampleStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeExample" component={HomeExampleScreen} />
        <Stack.Screen name="Example" component={ExampleScreen} />
    </Stack.Navigator>
  )
}

export default ExampleStackNavigator