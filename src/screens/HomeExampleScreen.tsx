import React from 'react'
import { View, Text, Button } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'

import { ExampleStackParamList } from '../navigation/types'

type NavigationProps = StackScreenProps<ExampleStackParamList, 'HomeExample'>

const HomeExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500">HomeExampleScreen</Text>
      <Button
        title="Go to Example"
        onPress={() => navigation.navigate("Example")}
      />
    </View>
  )
}

export default HomeExampleScreen
