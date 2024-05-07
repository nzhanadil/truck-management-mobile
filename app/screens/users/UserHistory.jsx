import { ScrollView, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import colors from '../../config/colors'

const UserHistory = ({history, transport}) => {
  const navigation = useNavigation()

  return (
    <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex flex-row justify-between p-2 h-[90%]'>
      <ScrollView>
        <List.Section >
            {history && history.slice(0).reverse().map(item => (
                <List.Accordion
                    title={`${item.startDate.replaceAll('-', '/')} - ${item.endDate.replaceAll('-', '/')}`}
                    titleStyle={{color: colors.primary[1]}}
                 >
                    <List.Item title={
                        <Text 
                            className='underline mb-0' 
                            onPress={() =>navigation.navigate(transport, {id: item[transport.toLowerCase()]})}
                        >
                            {`${transport}: ${item[transport.toLowerCase()]}`}
                        </Text>
                    }/>
                </List.Accordion>
            ))}
            {(!history || history.length === 0) && <Text className='w-full text-center'>No history...</Text>}
        </List.Section>
      </ScrollView>
    </View>
  )
}

export default UserHistory
