import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SegmentedButtons } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Header from './Header'
import { UserDetails, UserDialog, UserDocuments, UserHistory } from '../users'
import colors from '../../config/colors'
import DriverDashboard from '../users/DriverDashboard'
import ManagerDashboard from './ManagerDashboard'

const Home = () => {
  const { currentUser } = useSelector(store => store.users)
  const [value, setValue] = useState('');
  const options = [
    { value: 'dashboard', icon: 'view-dashboard-variant-outline' },
    { value: 'details', icon: 'card-account-details-outline' },
    { value: 'trucks', icon: 'truck-outline' },
    { value: 'trailers', icon: 'truck-trailer' },
    { value: 'documents', icon: 'file-document-multiple-outline' }
  ]
  useEffect(() => {
    setValue(options[0].value)
  }, [])

  return (
    <View>
      <Header />
      
      <View className='h-[85%] items-center'>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          theme={{colors: {secondaryContainer: colors.primary[3]}}}
          className='px-5 mt-3'
          buttons={options}
        />
        <View>
          {value === 'dashboard' &&
          currentUser.role === 'driver' ? 
          <DriverDashboard truck={currentUser.truck} trailer={currentUser.trailer}/> 
          :
          <ManagerDashboard />
          }
          {value === 'details' && <UserDetails {...currentUser} />}
          {value === 'trucks' && <UserHistory history={currentUser?.trucksHistory} transport='Truck'/>}
          {value === 'trailers' && <UserHistory history={currentUser?.trailersHistory} transport='Trailer'/>}
          {value === 'documents' && <UserDocuments />}
        </View>
      </View>
      <UserDialog />
    </View>
  )
}

export default Home
