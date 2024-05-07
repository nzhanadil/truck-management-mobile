import React, { useState } from 'react'
import { Text, View } from 'react-native'
import CustomSelect from '../../components/CustomSelect'
import { useSelector } from 'react-redux'

const Status = ({title, list, data}) => {
   const [ value, setValue ] = useState(list[0].value)
   return (
    <View className='w-[45vw] h-48 py-5 bg-primary-5 shadow-xl border-primary-2 border-2 m-2 rounded-md items-center justify-center'>
      <CustomSelect value={value} setValue={setValue} list={list}/>
      <Text className='text-5xl font-bold text-primary-2 my-2'>
        {value === 'all' ? data.length : data.filter(item => item.status === value).length}
      </Text>
      <Text className='text-xl text-primary-2 mb-2 font-bold'>{title}</Text>
    </View>
  )   
}

const ManagerDashboard = () => {
  const statusList = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Damaged", value: "damaged" },
    { label: "Assinged", value: "assigned" },
    { label: "Out of Service", value: "out of service" },
  ];

  const trailers = useSelector(store => store.trailers)
  const trucks = useSelector(store => store.trucks)

  return (
    <View>
      <Status title="Trucks" list={statusList} data={trucks.data}/>
      {/* <Status title="Trailers" list={statusList} data={trailers.data}/> */}
    </View>
  )
}

export default ManagerDashboard
