import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Button } from 'react-native-paper'
import { zodResolver } from '@hookform/resolvers/zod'

import db, {auth} from '../../config/firebase'
import { CustomInput, Loading } from '../../components'
import { setUser } from '../../store/usersSlice'

const schema = z.object({
    firstname: z.string().min(2, "Please enter valid firstname"),
    lastname: z.string().min(2, "Please enter valid lastname"),
    email: z.string().email(),
    phone_number: z.string().refine((value) => /^(?:[0-9-()/.]\s?){10}$/.test(value)),
    password: z.string().min(8, "Please enter longer password"),
    confirm_password: z.string(),
    register_code: z.string().min(2)
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"]
})

const Signup = ({navigation}) => {
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const {
        handleSubmit,
        setError,
        control,
        formState: {errors}
    } = useForm({resolver: zodResolver(schema)})

    const onSumbit = ({email, password, register_code}) => {
        if(register_code === 'driver234' || register_code === 'manager234' || register_code === 'admin234') {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
            })
            .catch((error) => {
                setError('email', {message: 'Email is already taken!'})
            })
        } else {
            setError('register_code', {message: 'Wrong register code'})
        }
        setTimeout(() => {setError('root', {message: ''})}, 1500)
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userDoc = await db.collection('users').doc(user.email).get();
                const userData = userDoc.data();
                dispatch(setUser(userData));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            dispatch(setUser(null));
        }
        if(isLoading) setIsLoading(false)
    });

  return (
    <>{isLoading ? <Loading/> :
    <ScrollView contentContainerStyle={{flex: 1,justifyContent: 'center'}} className='bg-primary-4'>
        <View className='w-80 bg-white items-center mx-auto rounded-md py-5 shadow-lg flex'>
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
            />
            <CustomInput
                name='password'
                control={control}
                label="Password"
                error={errors?.password?.message}
                secureTextEntry={hidePassword}
                icon={hidePassword ? 'eye-off' : 'eye'}
                handleClick={setHidePassword}
            />
            <CustomInput
                name='confirm_password'
                control={control}
                label="Confirm password"
                error={errors?.confirm_password?.message}
                secureTextEntry={hideConfirmPassword}
                icon={hidePassword ? 'eye-off' : 'eye'}
                handleClick={setHideConfirmPassword}
            />
            <CustomInput
                name='register_code'
                control={control}
                label="Registration code"
                error={errors?.register_code?.message}
                icon="key" 
            />
            { errors?.root?.message && <Text className='text-red-700 mt-1'>{errors.root.message}</Text>}
            <Button
                onPress={handleSubmit(onSumbit)}
                mode='contained'
                className='bg-primary-1 w-64 mt-5'
            >
                SIGN UP
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
        </View>
    </ScrollView>
    }</>
  )
}

export default Signup
