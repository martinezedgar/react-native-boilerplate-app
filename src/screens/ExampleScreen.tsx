import React, { useState } from 'react'
import { SafeAreaView, View, Text, Button } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { decrement, increment } from '../store/slices/exampleCounter'
import { ExampleStackParamList } from '../navigation/types'

type NavigationProps = StackScreenProps<ExampleStackParamList, 'Example'>

const ExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const count = useAppSelector( state => state.exampleCounter.value)
  const dispatch = useAppDispatch()
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-red-500 font-bold">ExampleScreen</Text>
      <View className='flex flex-row justify-between items-center'>
        <Button
          title="-"
          onPress={() => dispatch(decrement())}
        />
        <Text>{count}</Text>
        <Button
          title="+"
          onPress={() => dispatch(increment())}
        />
      </View>
      <Button
        title="Go to Home Example"
        onPress={() => navigation.navigate("HomeExample")}
      />
    </SafeAreaView>
  )
}

export default ExampleScreen