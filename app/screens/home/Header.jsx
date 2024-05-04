import React, { useState } from 'react'
import { View } from 'react-native'
import { Menu, Text } from 'react-native-paper'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { openEditUserDialog, setUser } from '../../store/usersSlice'
import colors from '../../config/colors'
import { CustomIconButton } from '../../components'

const Header = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(store => store.users)
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null))
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleEdit = () => {
    dispatch(openEditUserDialog(currentUser))
    setVisible(false)
  }

  return (
    <View className='flex flex-row justify-between px-5 py-1 bg-primary-1 items-center h-[10%]'>
        <Text className='text-2xl font-bold text-white'>Home</Text>
        <View className='flex flex-row'>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={<CustomIconButton icon='menu' onPress={() => setVisible(true)}/>}
                theme={{colors: {elevation: {level2: colors.primary[5]}}}}
            >
                <Menu.Item onPress={handleEdit}  title="Edit" trailingIcon='pencil-outline'/>
                <Menu.Item onPress={handleSignOut} title="Logout" trailingIcon='logout-variant'/>
            </Menu>
        </View>
    </View>
  )
}

export default Header
