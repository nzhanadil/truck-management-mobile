import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { currentUser } = useSelector(store => store.users)

  return (
    <View>
    </View>
  )
}

export default Dashboard
