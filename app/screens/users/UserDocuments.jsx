import { ScrollView, Text, View } from 'react-native'

const UserDocuments = () => {
  return (
    <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex p-2 h-[90%] items-center'>
      <ScrollView>
        <Text>Here will be User related docs</Text>
      </ScrollView>
    </View>
  )
}

export default UserDocuments
