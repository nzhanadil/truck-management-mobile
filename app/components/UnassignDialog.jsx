import { useEffect, useState } from 'react'
import { Button, Dialog, IconButton, Portal, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../config/colors'
import CameraComponent from './CameraComponent'
import { getCurrentDate, uploadImages } from '../utils/HelperFunctions'
import { setAlert, setUnassignDialog } from '../store/appSlice'
import { updateUser } from '../store/usersSlice'
import { updateTruck } from '../store/trucksSlice'

const UnassignDialog = () => {
  const dispatch = useDispatch()

  const { isOpen, type, id } = useSelector(store => store.app.unassignDialog)
  const users = useSelector(store => store.users)
  const trucks = useSelector(store => store.trucks)
  const trailers = useSelector(store => store.trailers)

  const [ camera , setCamera ] = useState(false)
  const [ images, setImages ] = useState([])
  const [ urls, setUrls ] = useState([])
  const [ error, setError ] = useState('')
  const [ user, setUser ] = useState('')

  const addPhoto = (image) => {
    setImages([...images, image])
    if(images.length === 10) setCamera(false)
  }

  useEffect(() => {
    setUser('')
    setUrls([])
    setImages([])
  }, [])

  const getUserHistory = (userId) => {
    // this logic needs to be changes when will start assigning based on the full name
    const user = users.data.filter(user => user.email === userId)[0]
    const history = [...user[type === 'truck' ? 'trucksHistory' : 'trailersHistory']]

    const lastHistory = {...history[history.length - 1], endDate: getCurrentDate()}
    history[history.length -1] = lastHistory

    return [...history]
  }

  const getTransportHistory = (id) => {
    const transport = (type === 'truck' ? trucks : trailers).data.filter(transport => transport.id === id)[0]
    const history = [...transport.history]

    const lastHistory = {...history[history.length - 1], endDate: getCurrentDate()}
    history[history.length -1] = lastHistory

    setUser(lastHistory.user)
    
    return [...history]
  }

  const handleUnassign = () => {
    const transportHistory = getTransportHistory(id)
    const userHistory = getUserHistory(user)

    const updatedTransport = { id, status: 'active', history: transportHistory }
    const updatedUser = { email: user, [type]: '', [type === 'truck' ? 'trucksHistory' : 'trailersHistory']: userHistory }

    //type === 'truck' ? dispatch(updateTruck(updatedTransport)) : dispatch(updateTrailer(updatedTransport))
    dispatch(updateUser(updateUser))
    dispatch(updateTruck(updatedTransport))

    const message = `${type === 'truck' ? 'Truck' : 'Trailer'} ${id} is successfully unassigned from ${email}!`
    dispatch(setAlert({ isOpen: true, message, type: 'success' }))
  }

  const handleSubmit = async () => {

    if(images.length >=10 || users.currentUser.role !== 'driver') {
        dispatch(dispatch(setUnassignDialog({isOpen: false, type: '', id: ''})))
        // this could give problem during execution
        setUrls(await uploadImages(`${type}s/${id}`, images))
        handleUnassign()
    } else {
        setError('Miniumum of 10 photos required')
        setTimeout(() => setError(''), 1500)
    }    
  }

  return (
    <Portal>
      <Dialog visible={isOpen} className="items-center bg-primary-1">
        <Dialog.Title>
          <Text className="text-white font-bold">Unassign {type}</Text>
        </Dialog.Title>
        <Dialog.Content className="bg-white w-full items-center pt-3">
            <Text className="text-xl">{images.length} photos added</Text>
            <IconButton
                icon="camera-plus"
                size={50}
                onPress={() => setCamera(true)}
            />
            { error && <Text className="text-red-500 text-xl">{error}</Text>}
        </Dialog.Content>
        <Dialog.Actions className='mt-5'>
            <Button
              mode='outlined'
              textColor={colors.white}
              className='border-2 border-white w-28'
              onPress={() => dispatch(setUnassignDialog({isOpen: false, type: '', id: ''}))}
            >
              Cancel
            </Button>
            <Button
              mode='contained'
              textColor={colors.primary[1]}
              className='border-2 bg-white w-28'
              onPress={handleSubmit}
            >
              Yes, Confirm
            </Button>
        </Dialog.Actions>
      </Dialog>
      {camera && <CameraComponent handleClose={() => setCamera(false)} handleAdd={addPhoto}/>}
    </Portal>
  )
}

export default UnassignDialog
