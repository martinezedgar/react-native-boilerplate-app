import React from 'react'
import { SafeAreaView, View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { decrement, increment } from '../store/slices/exampleCounter'
import { ExampleStackParamList } from '../navigation/types'
import {
  useGetPostsQuery,
  useLazyGetPostQuery,
  useLazyGetPostCommentQuery,
  useCreatePostMutation,
} from '../services/exampleApi'

type NavigationProps = StackScreenProps<ExampleStackParamList, 'Example'>

const ExampleScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const count = useAppSelector( state => state.exampleCounter.value)
  const dispatch = useAppDispatch()
  const { data: posts, isLoading} = useGetPostsQuery()
  const [getPost, {data: lazyPost}] = useLazyGetPostQuery()
  const [createPost, {data: newPost, error}] = useCreatePostMutation()
  const [getPostComment, {data: lazyPostComment}] = useLazyGetPostCommentQuery()

  return (
    <SafeAreaView className="flex flex-1">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View className='flex flex-1 justify-center items-center py-[5px] my-[5px]'>
          <Text className="text-red-500 font-bold">ExampleScreen</Text>
          {
            posts &&
            <View className='flex-1'>
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
        </View>

        <View className='flex flex-1 justify-center items-center py-[5px] my-[5px]'>
          {
            lazyPost &&
            <View className='flex-1'>
              <View className='flex flex-row'>
                <Text className='font-bold'>Post Id: </Text>
                <Text>{lazyPost.id}</Text>
              </View>
              <View>
                <Text className='font-bold'>Post Title: </Text>
                <Text>{lazyPost.title}</Text>
              </View>
            </View>
          }
          <View className='m-[10px]'>
            <Button
              title='Get post #3'
              onPress={() => getPost('3')}
            />
          </View>
        </View>

        <View className='flex-1 justify-center items-center py-[5px] my-[5px]'>
          {
            lazyPostComment &&
            <View className='flex-1'>
              <View className='flex flex-row'>
                <Text className='font-bold'>Id: </Text>
                <Text>{lazyPostComment[0].id}</Text>
              </View>
              <View>
                <Text className='font-bold'>Comment: </Text>
                <Text>{lazyPostComment[0].body}</Text>
              </View>
            </View>
          }
          <View className='m-[10px]'>
            <Button
              title='Get the second comment of the first post'
              onPress={() => getPostComment({postId: '1', commentId: '2'})}
            />
          </View>
        </View>

        <View className='flex-1 justify-center items-center py-[5px] my-[5px]'>
          {
            newPost &&
            <View className='flex-1'>
              <View className='flex flex-row'>
                <Text className='font-bold'>User Id: </Text>
                <Text>{newPost.userId}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='font-bold'>Id: </Text>
                <Text>{newPost.id}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='font-bold'>Title: </Text>
                <Text>{newPost.title}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='font-bold'>Body: </Text>
                <Text>{newPost.body}</Text>
              </View>
            </View>
          }
          <View className='m-[10px]'>
            <Button
              title='Create post'
              onPress={() => createPost({
                userId: 1,
                title: 'New Post',
                body: 'This is a new post'
              })}
            />
          </View>
        </View>
        <View className='flex-1 flex-row justify-center items-center py-[5px] my-[5px]'>
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
      </ScrollView>
      <View className='mb-2'>
      <Button
        title='Go to Home Example'
        onPress={() => navigation.navigate('HomeExample')}
      />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 5
  },
})

export default ExampleScreen