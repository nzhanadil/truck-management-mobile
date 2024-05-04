import { Portal, Button, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addTruck, closeTruckDialog, updateTruck } from '../../store/trucksSlice';
import { CustomDropDown, CustomInput } from '../../components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScrollView } from 'react-native';
import colors from '../../config/colors';
import { useEffect } from 'react';
import { setAlert } from '../../store/appSlice';

const schema = z.object({
    id: z.string().min(2, "Please enter truck id"),
    make: z.string().min(2, "Please enter make"),
    model: z.string().min(2, "Please enter model"),
    vin: z.string().min(6, "Please enter VIN"),
    status: z.string().min(1, "Please select status"),
    mileage: z.string().min(1, "Please enter mileage"),
    year: z.string().refine((value) => /^(?:[0-9-()/.]\s?){4}$/.test(value), "Please enter year"),
    color: z.string().min(3, "Please enter color"),
    plate_number: z.string().min(3, "Please enter plate number"),
})

const defaultValues = {
    id: '',
    make: '',
    model: '',
    vin: '',
    status: '',
    mileage: '',
    year: '',
    color: '',
    plate_number: '',
};

const TruckDialog = () => {
  const dispatch = useDispatch()
  const { isOpen, type, data } = useSelector(store => store.trucks.truckDialog)

  const initDialog = () => {
    if (type === 'edit' && data) {
        reset({ ...data });
    }
    if (type === 'new') {
        reset({
        ...defaultValues,
        ...data
        });
    }
  }

  useEffect(() => {
    initDialog()
  }, [isOpen])

  const {
    handleSubmit,
    reset,
    setError, 
    control,
    formState: {errors}
  } = useForm({resolver: zodResolver(schema), defaultValues})

  const statusList = [
    { label: "Active", value: "active" },
    { label: "Damaged", value: "damaged" },
    { label: "Out of Service", value: "out of service" },
  ];

  const onSubmit = (data) => {
    let message;
    if(type === 'new') {
        const res = dispatch(addTruck(data))
        if(res.payload === 'failed') {
            setError('id', {message: 'This id is already taken!'})
            setTimeout(() => {setError("id", {message: ""})},1500)
        } else {
            message = 'Truck '+ data.id + ' created successfully!'
        }
    } else {
        dispatch(updateTruck(data))
        message = 'Truck '+ data.id + ' updated successfully!'
    }
    dispatch(closeTruckDialog())
    dispatch(setAlert({isOpen: true, type:'Success', message: message}))
  }

  return (
    <Portal>
        <Dialog visible={isOpen} onDismiss={() => dispatch(closeTruckDialog())} className='rounded-md items-center h-[80vh] bg-primary-5'>
          <Dialog.Title className='text-2xl font-bold mb-5 text-primary-1'>{type === 'new' ? 'Create' : 'Edit'} Truck</Dialog.Title>
          <ScrollView className='bg-white'>
            <Dialog.Content>
              <CustomInput
                name="id"
                label="Truck id"
                control={control}
                error={errors?.id?.message}
                icon='identifier'
                disabled={type==='edit'}
              />
              <CustomInput
                name="make"
                label="Make"
                control={control}
                error={errors?.make?.message}
                icon='truck'
              />
              <CustomInput
                name="model"
                label="Model"
                control={control}
                error={errors?.model?.message}
                icon='shield-car'
              />
              <CustomInput
                name="vin"
                label="VIN"
                control={control}
                error={errors?.vin?.message}
                icon='ticket-confirmation'
              />
              <CustomDropDown 
                control={control}
                name='status'
                label="Status"
                list={statusList}
                error={errors?.status?.message}
              />
              <CustomInput
                name="mileage"
                label="Mileage"
                control={control}
                error={errors?.mileage?.message}
                icon='counter'
              />
              <CustomInput
                name="year"
                label="Year"
                control={control}
                error={errors?.year?.message}
                icon='calendar-month'
              />
              <CustomInput
                name="color"
                label="Color"
                control={control}
                error={errors?.color?.message}
                icon='palette'
              />
              <CustomInput
                name="plate_number"
                label="Plate numbet"
                control={control}
                error={errors?.plate_number?.message}
                icon='numeric'
              />
            </Dialog.Content>
          </ScrollView>
          <Dialog.Actions className='mt-5'>
              <Button 
                mode='outlined' 
                className='border-primary-1 border-2 w-32'
                textColor={colors.primary[1]}
                onPress={() => dispatch(closeTruckDialog())}
              >
                Close
              </Button>
              <Button 
                mode='contained'
                className='w-32 border-2 bg-primary-1'
                onPress={handleSubmit(onSubmit)}
              >
                {type === 'new' ? 'Create' : 'Update'}
              </Button>
          </Dialog.Actions>
        </Dialog>
    </Portal>
  );
};

export default TruckDialog;
