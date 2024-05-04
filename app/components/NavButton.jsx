import React from 'react'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/native'

const NavButton = ({icon, title, active, handleClick}) => {
    const navigatation = useNavigation()
    const handlePress = () => {
        handleClick(title)
        navigatation.navigate(title)
    }
  return (
    <Button onPress={handlePress}>
        <View className={`flex flex-col items-center rounded-md p-1 ${active === title && 'bg-white '}`}>
            <Icon source={icon} size={25} color={active === title ? colors.primary[1] : colors.white}/>
            <Text className={`text-xs font-bold text-${active === title ? 'primary-1' : 'white'}`}>{title}</Text>
        </View>
    </Button>
  )
}

export default NavButton
