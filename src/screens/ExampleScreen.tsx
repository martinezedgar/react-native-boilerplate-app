import React from 'react'
import { SafeAreaView, View, Text, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { decrement, increment } from '../store/slices/exampleCounter'
import { ExampleStackParamList } from '../navigation/types'
import { useGetPostsQuery } from '../services/exampleApi'

type NavigationProps = StackScreenProps<ExampleStackParamList, 'Example'>

const ExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const count = useAppSelector( state => state.exampleCounter.value)
  const dispatch = useAppDispatch()
  const { data: posts, isFetching, isLoading} = useGetPostsQuery()

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-red-500 font-bold">ExampleScreen</Text>
      {
        posts &&
        <View>
          <View className='flex flex-row'>
            <Text className='font-bold'>Post Id: </Text>
            <Text>{posts[0].id}</Text>
          </View>
          <View>
            <Text className='font-bold'>Post Title: </Text>
            <Text>{posts[0].title}</Text>
          </View>
        </View>
      }
      <View className='flex-1 flex-row justify-between items-center'>
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
      <View className='mb-2'>
        <Button
          title="Go to Home Example"
          onPress={() => navigation.navigate("HomeExample")}
        />
      </View>
    </SafeAreaView>
  )
}

export default ExampleScreen