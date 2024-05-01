import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'
import { z } from 'zod'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Button, Dialog, Portal } from 'react-native-paper'
import { zodResolver } from '@hookform/resolvers/zod'

import {auth} from '../../config/firebase'
import CustomInput from '../../components/CustomInput'

const schema = z.object({
    email: z.string().email()
})

const ResetPassword = ({navigation}) => {
    const [ visible, setVisible ] = useState(false)
    const {
        handleSubmit,
        setError,
        control,
        formState: {errors}
    } = useForm({resolver: zodResolver(schema)})

    const onSumbit = ({email}) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setVisible(true)
            })
            .catch((error) => {
                setError('root', {message: 'Something went wrong, please try again!'})
            })
        setTimeout(() => {setError('root', {message: ''})}, 1500)
    }

  return (
    <ScrollView contentContainerStyle={{flex: 1,justifyContent: 'center'}} className='bg-primary-4'>
        <View className='w-80 bg-white items-center mx-auto rounded-md py-5 shadow-lg flex'>
            <CustomInput
                name='email'
                control={control}
                label="Email"
                error={errors?.email?.message}
                icon="email" 
            />
            { errors?.root?.message && <Text className='text-red-700 mt-1'>{errors.root.message}</Text>}
            <Button
                onPress={handleSubmit(onSumbit)}
                mode='contained'
                className='bg-primary-1 w-64 mt-5'
            >
                SEND RESET LINK
            </Button>

            <View className='flex flex-row gap-1 mt-5'>
                <Text>Back to</Text>
                <Text
                    className='text-primary-1 font-bold' 
                    onPress={() => navigation.navigate('signin')}
                >
                    SIGN IN
                </Text>
            </View>

            <View>
                <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)} className='bg-white'>
                    <Dialog.Title>Success</Dialog.Title>
                    <Dialog.Content>
                    <Text variant="bodyMedium">Your reset link was sent to your email!</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>
                            <Text className='text-xl font-bold text-primary-1'>OK</Text>
                        </Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
            </View>
        </View>
    </ScrollView>
  )
}

export default ResetPassword
