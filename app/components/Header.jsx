import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import colors from '../config/colors'

const Header = ({title, searchText, setSearchText, openDialog}) => {
    const dispatch = useDispatch()
    const [ search, setSearch ] = useState(false)

    return (
        <View className='flex flex-row justify-between px-5 py-1 bg-primary-1 items-center h-[10%]'>
            { search ? 
            <View>
                <TextInput
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearchText(text))}
                    className="w-[90vw] h-12 bg-gray-50"
                    placeholder='Search...'
                    activeOutlineColor={colors.primary[1]}
                    mode='outlined'
                    right={searchText && <TextInput.Icon color={colors.primary[1]} onPress={() => dispatch(setSearchText(''))} icon={'close-circle'} />}
                    left={<TextInput.Icon color={colors.primary[1]} onPress={() => {
                        setSearch(false)
                        dispatch(setSearchText(''))
                    }} icon={'arrow-left'} />}
                />
            </View>
            :
            <>
            <Text className='text-2xl font-bold text-white'>{title}</Text>
            <View className='flex flex-row '>
                <IconButton 
                    icon='plus' 
                    iconColor={colors.primary[1]} 
                    containerColor={colors.white} 
                    mode='contained' 
                    onPress={() => dispatch(openDialog())}
                />
                <IconButton 
                    icon='magnify' 
                    iconColor={colors.primary[1]} 
                    containerColor={colors.white} 
                    className='bg-white' 
                    mode='contained'
                    onPress={() => setSearch(true)} 
                />
            </View>
            </>}
        </View>
    )
}

export default Header
