import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from 'react-native-paper'
import { zodResolver } from '@hookform/resolvers/zod'

import db, {auth} from '../../config/firebase'
import Loading from '../../components/Loading'
import CustomInput from '../../components/CustomInput'
import { setUser } from '../../store/usersSlice'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Please enter your password.")
})

const Signin = () => {
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const {
        handleSubmit,
        setError,
        control,
        formState: {errors}
    } = useForm({resolver: zodResolver(schema)})

    const onSumbit = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
            })
            .catch((error) => {
                setError('root', {message: 'Email or Password is not correct!'})
            })
        setTimeout(() => {setError('root', {message: ''})}, 1500)
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userDoc = await db.collection('users').doc(user.email).get();
                const userData = userDoc.data();
                dispatch(setUser(userData));
                console.log(user)
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
    <View className="flex flex-col justify-center w-[100vw] h-[100vh] bg-primary-4">
        <View className='w-80 bg-white items-center mx-auto rounded-md py-5 shadow-lg flex'>
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
            { errors?.root?.message && <Text className='text-red-700 mt-1'>{errors.root.message}</Text>}
            <Button
                onPress={handleSubmit(onSumbit)}
                mode='contained'
                className='bg-primary-1 w-64 mt-5'
            >
                Sign in
            </Button> 
        </View>
    </View>
    }</>
  )
}

export default Signin
