import React from 'react'
import { View } from 'react-native'
import { Header } from '../../components'
import { useSelector } from 'react-redux'
import { openNewTruckDialog, setSearchText } from '../../store/trucksSlice'
import TrucksList from './TrucksList'

const Trucks = () => {
  const { searchText } = useSelector(store => store.trucks)

  return (
    <View>
        <Header 
          title='Trucks' 
          searchText={searchText} 
          setSearchText={setSearchText} 
          openDialog={openNewTruckDialog}
        />
        <TrucksList />
    </View>
  )
}

export default Trucks