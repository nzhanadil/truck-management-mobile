import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const Card = ({title, transport}) => {
  const handleClick = () => {
    if(transport) {
        if(title === 'Truck') console.log('unassign truck')
        if(title === 'Trailer') console.log('unassign trailer')
    } else {
        if(title === 'Truck') console.log('assign truck')
        if(title === 'Trailer') console.log('assign trailer')
    }
  }

  return (
    <View className='w-[45vw] h-48 py-5 bg-primary-5 shadow-xl border-primary-2 border-2 m-2 rounded-md items-center justify-center'>
      <Text className='text-xl text-primary-2'>{title} status</Text>
      <Text className='text-3xl font-bold my-4 text-primary-2'>{transport || `No ${title}`}</Text>
      <Button 
        mode='contained'
        onPress={handleClick} 
        className='bg-primary-2 w-32'
      >
        {transport ? 'Unassign' : 'Assign'}
      </Button>
    </View>
  )
}

const DriverDashboard = ({truck, trailer}) => {
  return (
    <View className='flex flex-row'>
      <Card title='Truck' transport={truck}/>
      <Card title='Trailer' transport={trailer}/>
    </View>
  )
}

export default DriverDashboard
