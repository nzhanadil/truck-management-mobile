import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import DriverOptions from './DriverOptions'
import Header from './Header'
import { UserDialog } from '../users'

const Home = () => {
  const { currentUser } = useSelector(store => store.users)

  return (
    <View>
      <Header />
      
      <View className='h-[85%] items-center'>
        <Text>{currentUser.firstname+" "+currentUser.lastname}</Text>
        <Text>{currentUser.role}</Text>
        <DriverOptions />
      </View>
      <UserDialog />
    </View>
  )
}

export default Home
