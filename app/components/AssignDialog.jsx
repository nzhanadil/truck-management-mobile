import { useEffect, useState } from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../config/colors'
import { getCurrentDate } from '../utils/HelperFunctions'
import { setAlert, setAssignDialog } from '../store/appSlice'
import { updateUser } from '../store/usersSlice'
import { updateTruck } from '../store/trucksSlice'
import CustomSelect from './CustomSelect'

const AssignDialog = () => {
  const dispatch = useDispatch()

  const { isOpen, type, id, assignTo } = useSelector(store => store.app.assignDialog)
  const users = useSelector(store => store.users)
  const trucks = useSelector(store => store.trucks)
  const trailers = useSelector(store => store.trailers)

  const [ error, setError ] = useState('')
  const [ user, setUser ] = useState('')
  const [ transport, setTransport ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ options, setOptions ] = useState([])
  const [ value, setValue ] = useState('')

  const getAvailableDrivers = (type) => {
    const user = users.currentUser
    if(user) {
        if(user.role === 'driver') return user[type] === '' ? [`${user.firstname} ${user.lastname}`] : []
        return users.data.filter(user => user.role === 'driver' && user[type] === '').map(user => `${user.firstname} ${user.lastname}`)
    }
    return []
  }

  const getAvailableTransports = (type) => {
    const transports = (type === 'truck' ? trucks : trailers).data
    return transports.filter(transport => (transport.status === 'active' || transport.status === 'damaged' )).map(el => el.id)
  }

  useEffect(() => {
    setValue('')
    const op = assignTo === 'driver' ? getAvailableTransports(type) : getAvailableDrivers(type)
    setOptions(op.map(item => ({value: item, label: item})))
  }, [isOpen])

  useEffect(() => {
    if(assignTo === 'driver') {
        setUser(`${users.currentUser.firstname} ${users.currentUser.lastname}`)
        setEmail(users.currentUser.email)
        setTransport(value)
    } else if(assignTo === 'transport') {
        setEmail(findEmail(value))
        setUser(value)
        setTransport(id)
    }
  }, [value])

  const getUserHistory = (userId) => {
    const user = users.data.filter(user => `${user.firstname} ${user.lastname}` === userId)[0]
    const history = [...user[type === 'truck' ? 'trucksHistory' : 'trailersHistory']]

    const newHistory = {startDate: getCurrentDate(), endDate: '', [type]: transport}
    return [...history, newHistory]
  }

  const getTransportHistory = (id) => {
    const transport = (type === 'truck' ? trucks : trailers).data.filter(transport => transport.id === id)[0]
    const history = [...transport.history]

    const newHistory = {startDate: getCurrentDate(), endDate: '', user: user, images: []}
    return [...history, newHistory]
  }

  const findEmail = (value) => {
    return users.data.find(usr => `${usr.firstname} ${usr.lastname}` === value).email
  }

  const handleAssign = () => {
    const updatedTransport = {id: transport, status: 'assigned', history: getTransportHistory(transport)}
    const updatedUser = {email: email,[type]: transport, [type === 'truck' ? 'trucksHistory' : 'trailersHistory'] : getUserHistory(user)}

    dispatch(setAssignDialog({ isOpen: false, id: '', type: '', assignTo: '' }))
    // // type === 'truck' ? dispatch(updateTruck(updatedTransport)) : dispatch(updateTrailer(updatedTransport))
    dispatch(updateTruck(updatedTransport))
    dispatch(updateUser(updatedUser))

    const message = `${type === 'truck' ? 'Truck' : 'Trailer'} ${id} is successfully assigned to ${user}!`
    dispatch(setAlert({ isOpen: true, message, type: 'success' }))
  }

  const handleSubmit = async () => {
    if(value) {
        handleAssign()
    } else {
        setError(`Please select a ${assignTo === 'transport' ? 'driver' : type === 'truck' ? 'truck' : 'trailer'}`)
        setTimeout(() => setError(''), 1500)
    }
  }

  return (
    <Portal>
      <Dialog visible={isOpen} className="items-center bg-primary-1">
        <Dialog.Title>
          <Text className="text-white font-bold">Assign {type}</Text>
        </Dialog.Title>
        <Dialog.Content className="bg-white w-full items-center pt-3">
            <CustomSelect value={value} setValue={setValue} list={options}/>
            { error && <Text className="text-red-500 text-xl">{error}</Text>}
        </Dialog.Content>
        <Dialog.Actions className='mt-5'>
            <Button
              mode='outlined'
              textColor={colors.white}
              className='border-2 border-white w-28'
              onPress={() => dispatch(setAssignDialog({isOpen: false, type: '', id: '', assignTo: ''}))}
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
    </Portal>
  )
}

export default AssignDialog
