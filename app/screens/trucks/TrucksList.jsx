import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTrucks } from '../../store/trucksSlice';
import colors from '../../config/colors';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsers } from '../../store/usersSlice';

const TrucksList = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { data, searchText } = useSelector(store => store.trucks)
    const { currentUser } = useSelector(store => store.users)
    const [ filteredData, setFilteredData ] = useState([])
    const [page, setPage] = useState(0)
    const [numberOfItemsPerPageList] = useState([5, 10, 15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[1]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, filteredData.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        dispatch(getTrucks())
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        const getFilteredArray = (data, searchText) => {
            let trucks = data;
            if( currentUser.role === 'driver' ) trucks = data.filter(truck => truck.status === 'active')
            if(searchText.trim().length === 0) return trucks
            return trucks.filter(truck => (truck.id+" "+truck.make+" "+truck.model).toLowerCase().includes(searchText.trim()))
        }
        if(data) {
            setFilteredData(getFilteredArray(data, searchText))
        }
    }, [data, searchText])

  return (
    <DataTable className={`h-[85%] z-10`}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Make</DataTable.Title>
        <DataTable.Title>Model</DataTable.Title>
        <DataTable.Title>Plate</DataTable.Title>
      </DataTable.Header>

      <View className='h-[85%]'>
        <ScrollView>
        {filteredData.slice(from, to).map((item) => (
          <DataTable.Row key={item.id} onPress={() => navigation.navigate('Truck', {id: item.id})}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.make}</DataTable.Cell>
            <DataTable.Cell>{item.model}</DataTable.Cell>
            <DataTable.Cell>{item.plate_number}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </ScrollView>
      </View>

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${filteredData.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
        className='absolute bottom-0'
        paginationControlRippleColor={colors.primary[1]}
        theme={{colors: {elevation: {level2: colors.white}}}}
      />
    </DataTable>
  );
};

export default TrucksList;
