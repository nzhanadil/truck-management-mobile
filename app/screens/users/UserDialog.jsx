import { Portal, Button, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import { CustomDropDown, CustomInput } from '../../components';
import { addUser, closeUserDialog, updateUser } from '../../store/usersSlice';
import colors from '../../config/colors';
import { setAlert } from '../../store/appSlice';

const schema = z.object({
    firstname: z.string().min(2, "Please enter valid firstname"),
    lastname: z.string().min(2, "Please enter valid lastname"),
    email: z.string().email(),
    phone_number: z.string().refine((value) => /^(?:[0-9-()/.]\s?){10}$/.test(value)),
    role: z.string().min(2, "Please select a role"),
})

const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    role: ''
};

const UserDialog = () => {
  const dispatch = useDispatch()
  const { isOpen, type, data } = useSelector(store => store.users.userDialog)
  const { currentUser } = useSelector(store => store.users)

  const initDialog = () => {
    if (type === 'edit' && data) {
        reset({ ...data });
    }
    if (type === 'new') {
        reset({
        ...defaultValues,
        ...data
        });
    }
  }

  useEffect(() => {
    initDialog()
  }, [isOpen])

  const {
    handleSubmit,
    reset,
    setError, 
    control,
    formState: {errors}
  } = useForm({resolver: zodResolver(schema), defaultValues})

  const statusList = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Driver", value: "driver" },
  ];

  const onSubmit = (data) => {
    let message;
    if(type === 'new') {
        const res = dispatch(addUser(data))
        if(res.payload === 'failed') {
            setError('email', {message: 'This email is already taken!'})
            setTimeout(() => {setError("email", {message: ""})},1500)
        } else {
            message = 'User '+ data.email + ' created successfully!'
        }
    } else {
        dispatch(updateUser(data))
        message = 'User '+ data.email + ' updated successfully!'
    }
    dispatch(closeUserDialog())
    dispatch(setAlert({isOpen: true, type:'Success', message: message}))
  }

  return (
    <Portal>
        <Dialog visible={isOpen} onDismiss={() => dispatch(closeUserDialog())} className='rounded-md items-center bg-primary-5'>
          <Dialog.Title className='text-2xl font-bold mb-5 text-primary-1'>{type === 'new' ? 'Create' : 'Edit'} User</Dialog.Title>
          <ScrollView className='bg-white'>
            <Dialog.Content>
              <CustomInput
                name='firstname'
                control={control}
                label="Firstname"
                error={errors?.firstname?.message}
                icon="account" 
              />
              <CustomInput
                name='lastname'
                control={control}
                label="Lastname"
                error={errors?.lastname?.message}
                icon="account" 
              />
              <CustomInput
                name='phone_number'
                control={control}
                label="Phone number"
                error={errors?.phone_number?.message}
                icon="phone" 
              />
              <CustomInput
                name='email'
                control={control}
                label="Email"
                error={errors?.email?.message}
                icon="email"
                disabled={type === 'edit'} 
              />
              <CustomDropDown 
                control={control}
                name='role'
                label="Role"
                list={statusList}
                error={errors?.role?.message}
                disabled={currentUser.role !== 'admin'}
              />
            </Dialog.Content>
          </ScrollView>
          <Dialog.Actions className='mt-5'>
              <Button 
                mode='outlined' 
                className='border-primary-1 border-2 w-32'
                textColor={colors.primary[1]}
                onPress={() => dispatch(closeUserDialog())}
              >
                Close
              </Button>
              <Button 
                mode='contained'
                className='w-32 border-2 bg-primary-1'
                onPress={handleSubmit(onSubmit)}
              >
                {type === 'new' ? 'Create' : 'Update'}
              </Button>
          </Dialog.Actions>
        </Dialog>
    </Portal>
  );
};

export default UserDialog;
