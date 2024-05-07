import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text, View } from 'react-native'
import DropDown from 'react-native-paper-dropdown';

import colors from '../config/colors';

const CustomDropDown = ({name, control, label, error, icon, list, disabled }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  
  return (
    <View className='w-64 mt-5'>
        <Controller
            name={name}
            control={control}
            render={({ field: {value, onChange, onBlur} }) => (
                <DropDown
                    inputProps={{disabled: disabled}}
                    disabled={disabled}
                    label={label}
                    mode="outlined"
                    visible={showDropDown}
                    showDropDown={() => {
                        !disabled && setShowDropDown(true)
                    }}
                    onDismiss={() => setShowDropDown(false)}
                    value={value}
                    setValue={onChange}
                    list={list}
                    onBlur={onBlur}
                    activeColor={colors.primary[3]}
                />
            )}
        />
        { error && <Text className='text-red-700 mt-1'>{error}</Text>}
    </View>
  )
}

export default CustomDropDown
