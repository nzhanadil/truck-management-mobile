import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'


const Header = ({title, searchText, setSearchText, openDialog}) => {
    const dispatch = useDispatch()
    const [ search, setSearch ] = useState(false)

    return (
        <View className='flex flex-row justify-between px-5 py-1 bg-purple-50 items-center h-16'>
            { search ? 
            <View>
                <TextInput
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearchText(text))}
                    className="w-[90vw] h-13 bg-gray-50"
                    placeholder='Search...'
                    mode='outlined'
                    right={searchText && <TextInput.Icon color='#4A148C' onPress={() => dispatch(setSearchText(''))} icon={'close-circle'} />}
                    left={<TextInput.Icon color='#4A148C' onPress={() => {
                        setSearch(false)
                        dispatch(setSearchText(''))
                    }} icon={'arrow-left'} />}
                />
            </View>
            :
            <>
            <Text className='text-2xl font-bold text-purple-900'>{title}</Text>
            <View className='flex flex-row '>
                <IconButton icon='plus' mode='contained' onPress={() => dispatch(openDialog())}/>
                <IconButton icon='magnify'mode='contained'onPress={() => setSearch(true)} />
            </View>
            </>}
        </View>
    )
}

export default Header
