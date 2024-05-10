import React, { useEffect, useRef, useState } from 'react'
import {AutoFocus, Camera} from 'expo-camera'
import { Image, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

const CameraComponent = ({handleClose, handleAdd}) => {
  let cameraRef = useRef()
  const [ hasCameraPermission, setHasCameraPermission ] = useState()
  const [ photo, setPhoto ] = useState()

  useEffect(() => {
    (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === 'granted')
    })()
  }, [])

  if( hasCameraPermission === undefined ) {
    return <Text>Requesting permissions...</Text>
  } else if(!hasCameraPermission){
    return <Text>Give camera permissions</Text>
  }

  const takePicture = async () => {
    let options = {
        quality: 1,
        exif: false
    }

    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  }
  if(photo) {
    let addPhoto = () => {
      handleAdd(photo)
      setPhoto(undefined)
    }
    return (
      <View>
        <Image
            className='w-full h-full self-stretch'
            source={{uri: photo.uri}}
        />

        <IconButton
          className='absolute right-2 top-8' 
          icon="close-circle"
          size={40}
          iconColor='white'
          onPress={handleClose}
        />
        
        <View className='absolute bottom-2 flex w-full justify-center flex-row'>
          <IconButton
            icon="camera-retake"
            iconColor={"white"}
            size={80}
            onPress={() => setPhoto(undefined)}
          />
          <IconButton
            icon="plus-box"
            iconColor={"white"}
            size={80}
            onPress={addPhoto}
          />
        </View>
      </View>
    )
  }

  return (
    <Camera
    style={{flex: 1, width:"100%"}}
    className="w-full absolute top-0 h-full"
    ref={cameraRef}
    autoFocus={AutoFocus.on}
    >
      <IconButton
        className='absolute right-2 top-8' 
        icon="close-circle"
        size={40}
        iconColor='white'
        onPress={handleClose}
      />

      <View className='absolute bottom-2 flex w-full items-center'>
        <IconButton
          icon="circle-slice-8"
          iconColor={"white"}
          size={80}
          onPress={takePicture}
        />
      </View>
    </Camera>
  )
}

export default CameraComponent
