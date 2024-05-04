import React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../store/appSlice'
import colors from '../config/colors'

const Alert = () => {
    const { isOpen, message, type } = useSelector(store => store.app.alert)
    const dispatch = useDispatch()
  return (
    <Portal>
        <Dialog 
            visible={isOpen}
            style={{backgroundColor: type.toLowerCase() === 'success' ? colors.primary[4] : colors.secondary[4]}} 
            onDismiss={() => dispatch(setAlert({isOpen: false, message: '', type: ''}))}
        >
            <Dialog.Title>{type}</Dialog.Title>
            <Dialog.Content>
                <Text variant="bodyMedium">{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button textColor={colors.primary[1]} onPress={() => dispatch(setAlert({isOpen: false, message: '', type: ''}))}>OK</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  )
}

export default Alert
