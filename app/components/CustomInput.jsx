import React from 'react'
import { Controller } from 'react-hook-form'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import colors from '../config/colors'

const CustomInput = ({name, control, label, secureTextEntry, error, icon, handleClick, disabled }) => {
  return (
    <View>
        <Controller
            name={name}
            control={control}
            render={({ field: {value, onChange, onBlur} }) => (
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="w-64 mt-5"
                    disabled={disabled}
                    label={label}
                    activeOutlineColor={colors.primary[1]}
                    mode='outlined'
                    secureTextEntry={secureTextEntry}
                    error={error}
                    right={<TextInput.Icon onPress={() => {
                        if(secureTextEntry !== null) {
                            handleClick(!secureTextEntry)
                        }
                    }} icon={icon} />}
                />
            )}
        />
        { error && <Text className='text-red-700 mt-1'>{error}</Text>}
    </View>
  )
}

export default CustomInput
