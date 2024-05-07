import React from 'react'
import { View, Text } from 'react-native'

const Detail = ({label, value}) => {
  return (
    <View className='rounded-xl m-1 px-2 py-1  bg-primary-3  flex flex-row justify-between w-[95%]'>
        <Text className='text-primary-1 font-bold mr-1'>{label}</Text>
        <Text className='text-white font-bold'>{value}</Text>
    </View>
  )
}

const UserDetails = ({firstname, lastname, email, phone_number, role, joinded_date}) => {
  return (
    <View>
        <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex flex-row justify-between p-2'>
            <View className='items-center'>
                <Detail label='Firstname:' value={firstname} />
                <Detail label='Lastname:' value={lastname} />
                <Detail label='Email:' value={email} />
                <Detail label='Phone:' value={phone_number} />
                <Detail label='Role:' value={role} />
                <Detail label='Joined:' value={joinded_date} />
            </View>
        </View>

        <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 h-64 justify-center items-center'>
            <Text>Some extra info here</Text>
        </View>
    </View>
  )
}

export default UserDetails
