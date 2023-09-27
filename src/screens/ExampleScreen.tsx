import { SafeAreaView, Text, Button } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ExampleStackParamList } from '../navigators/types'

type NavigationProps = NativeStackScreenProps<ExampleStackParamList, 'Example'>

const ExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-red-500">ExampleScreen</Text>
      <Button
        title="Go to HomeExample"
        onPress={() => navigation.navigate("HomeExample")}
      />
    </SafeAreaView>
  )
}

export default ExampleScreen