import { Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert, setDialog } from '../store/appSlice'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/core'

const CustomDialog = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { isOpen, message, alertMessage, handleConfirm, data, navigateBack } = useSelector(store => store.app.dialog)

  const handleCancel = () => dispatch(setDialog({ isOpen: false, message: '', handleConfirm: () => {}, data: null, navigateBack: false}))

  const handleYes = () => {
    dispatch(handleConfirm(data))
    if(alertMessage) dispatch(setAlert({isOpen: true, message: alertMessage, type: 'Success'}))
    if(navigateBack) navigation.goBack()
    handleCancel()
  }

  return (
    <Portal>
        <Dialog visible={isOpen} >
        <Dialog.Content>
            <Text variant="bodyMedium" className=''>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={handleCancel} mode='outlined' textColor={colors.primary[1]} className='w-24 border-primary-1 border-2'>Cancel</Button>
            <Button onPress={handleYes} mode='contained' className='w-24 border-2 bg-primary-1'>Yes</Button>
        </Dialog.Actions>
        </Dialog>
    </Portal>
  )
}

export default CustomDialog
