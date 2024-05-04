import React, { useState } from 'react'
import { View } from 'react-native'
import NavButton from './NavButton'

const BottomNavigation = () => {
  const [ activeTab, setActiveTab ] = useState('Home')
  const routes = [
    { title: 'Home', icon: 'home-outline'},
    { title: 'Managers', icon: 'account-group-outline'},
    { title: 'Drivers', icon: 'card-account-details-outline'},
    { title: 'Trucks', icon: 'truck-outline'},
    { title: 'Trailers', icon: 'truck-trailer'},
    { title: 'Settings', icon: 'cog-outline'}
  ]

  return (
    <View className='absolute bottom-0 w-full bg-primary-1 flex flex-row justify-evenly h-[10%] px-3 pt-1 box-border'>
      {routes.map(route => (
        <NavButton
            key={route.title}
            icon={route.icon} 
            title={route.title} 
            active={activeTab}
            handleClick={setActiveTab}
        />
      ))}
    </View>
  )
}

export default BottomNavigation
