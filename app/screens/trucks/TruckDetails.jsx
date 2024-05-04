import React from 'react'
import { View, Text } from 'react-native'

const Detail = ({label, value}) => {
  return (
    <View className='rounded-xl m-1 px-2 py-1  bg-primary-3 w-[41vw] flex flex-row'>
        <Text className='text-primary-1 font-bold mr-1 w-[41.8%]'>{label}</Text>
        <Text className='text-white font-bold'>{value}</Text>
    </View>
  )
}

const TruckDetails = ({id, make, model, vin, status, mileage, year, color, plate_number, created_date}) => {
  return (
    <View>
        <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex flex-row justify-between p-2'>
            <View>
                <Detail label='ID:' value={id} />
                <Detail label='Make:' value={make} />
                <Detail label='Model:' value={model} />
                <Detail label='VIN:' value={vin} />
                <Detail label='Status:' value={status} />
            </View>
            <View>
                <Detail label='Mileage:' value={mileage} />
                <Detail label='Year:' value={year} />
                <Detail label='Color:' value={color} />
                <Detail label='Plate:' value={plate_number} />
                <Detail label='Since:' value={created_date} />
            </View>
        </View>

        <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 h-64 justify-center items-center'>
            <Text>Each truck will have thier default pictures here</Text>
        </View>
    </View>
  )
}

export default TruckDetails
