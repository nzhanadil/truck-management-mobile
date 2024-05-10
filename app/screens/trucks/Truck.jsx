import { Text, View } from 'react-native'
import { Menu, SegmentedButtons } from 'react-native-paper'
import colors from '../../config/colors'
import { CustomIconButton } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTruck, openEditTruckDialog } from '../../store/trucksSlice'
import { useEffect, useState } from 'react'
import TruckDetails from './TruckDetails'
import TruckHistory from './TruckHistory'
import TruckDocuments from './TruckDocuments'
import { setAssignDialog, setDialog } from '../../store/appSlice'

const Truck = ({route, navigation}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [ truckData, setTruckData ] = useState([])
  const id = route.params.id;

  const options = [
    { value: 'details', label: 'Details', icon: 'card-account-details-outline' },
    { value: 'history', label: 'History', icon: 'history' },
    { value: 'documents', label: 'Documents', icon: 'file-document-multiple-outline' }
  ]

  const { data } = useSelector(store => store.trucks)
  
  const handleEdit = () => {
    dispatch(openEditTruckDialog(truckData))
    setVisible(false)
  }

  const handleDelete = () => {
    dispatch(setDialog(
      { isOpen: true, 
        message: `Are you sure you wanna delete Truck ${id}?`, 
        handleConfirm: deleteTruck, 
        data: truckData.id, 
        alertMessage: `Truck ${id} was deleted successfully!`,
        navigateBack: true
      }))
    setVisible(false)
  }

  const handleAssign = () => {
    dispatch(setAssignDialog({isOpen: true, type: 'truck', id: id, assignTo: 'transport'}))
    setVisible(false)
  }

  useEffect(() => {
    setValue(options[0].value)
    setTruckData(data.find(truck => truck.id === id))
  }, [id])

  return (
    <View>
      <View className='flex flex-row justify-between px-5 py-1 bg-primary-1 items-center h-[10%]'>
        <Text className='text-2xl font-bold text-white'>Truck {route.params.id}</Text>
        <View className='flex flex-row'>
  
          <CustomIconButton icon='arrow-left' onPress={navigation.goBack}/>
          
          <View style={{}}>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={<CustomIconButton icon='dots-vertical' onPress={() => setVisible(true)}/>}
              theme={{colors: {elevation: {level2: colors.primary[5]}}}}
            >
              <Menu.Item onPress={handleDelete} title="Delete" trailingIcon='delete-outline'/>
              <Menu.Item onPress={handleEdit} title="Edit" trailingIcon='pencil-outline'/>
              <Menu.Item 
                disabled={truckData.status === 'assigned' || truckData.status === 'out of service'} 
                onPress={handleAssign} 
                title="Assign" 
                trailingIcon='clipboard-account-outline'
              />
            </Menu>
          </View>

        </View>
      </View>
      <View className='h-[85%] items-center'>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          theme={{colors: {secondaryContainer: colors.primary[3]}}}
          className='w-[90%] mt-3'
          buttons={options}
        />
        <View>
          {value === 'details' && <TruckDetails {...truckData} />}
          {value === 'history' && <TruckHistory history={truckData.history} />}
          {value === 'documents' && <TruckDocuments />}
        </View>
      </View>
    </View>
  )
}

export default Truck
