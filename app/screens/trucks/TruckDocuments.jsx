import { ScrollView, Text, View } from 'react-native'

const TruckDocuments = () => {
  return (
    <View className='border-2 border-primary-1 rounded-xl mt-5 w-[90vw] bg-primary-5 flex flex-row justify-between p-2 h-[90%]'>
      <ScrollView>
        <Text>Here will be Truck related docs</Text>
      </ScrollView>
    </View>
  )
}

export default TruckDocuments
