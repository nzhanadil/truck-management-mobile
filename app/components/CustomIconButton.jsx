import { IconButton } from 'react-native-paper'
import colors from '../config/colors'

const CustomIconButton = ({icon, onPress}) => {
  return (
    <IconButton 
        icon={icon} 
        iconColor={colors.primary[1]} 
        containerColor={colors.white} 
        className='bg-white' 
        mode='contained'
        onPress={onPress} 
    />
  )
}

export default CustomIconButton
