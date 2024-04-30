import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'

import colors from '../config/colors'
import { useSelector } from 'react-redux'

const Loading = () => {
  const { isLoading } = useSelector(store => store.app)
  return (
    <View className='w-[100vw] h-[100vh] justify-center align-middle bg-primary-4'>
        <ActivityIndicator animating={true} size='large' color={colors.primary['1']} />
    </View>
  )
}

export default Loading
