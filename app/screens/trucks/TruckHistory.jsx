import { Image, ScrollView, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import colors from '../../config/colors'

const TruckHistory = ({history}) => {
  const navigation = useNavigation()

  return (
    <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex flex-row justify-between p-2 h-[90%]'>
      <ScrollView>
        <List.Section >
            {history.slice(0).reverse().map(item => (
                <List.Accordion
                    title={`${item.startDate.replaceAll('-', '/')} - ${item.endDate.replaceAll('-', '/')}`}
                    titleStyle={{color: colors.primary[1]}}
                 >
                    <List.Item title={
                        <Text className='underline mb-0' onPress={() =>navigation.navigate('driver', {id: item.user})}>{item.user}</Text>
                    }/>
                    <List.Item title={
                        <ScrollView horizontal={true} className={item.images[0] ? 'h-64' : 'h-0'}>
                            {item?.images?.map(image => (
                                <Image source={{uri: image}} className='w-64 mr-2' style={{resizeMode: 'contain'}}/>
                            ))}    
                        </ScrollView>
                    } />
                </List.Accordion>
            ))}
            {history.length === 0 && <Text className='w-full text-center'>No history...</Text>}
        </List.Section>
      </ScrollView>
    </View>
  )
}

export default TruckHistory
