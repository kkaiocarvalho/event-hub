import React from 'react';
import { View, StyleSheet, Pressable, Keyboard, Image, TouchableOpacity} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';


import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';

import theme from '../../components/theme/theme';

import CameraComponent from '../../components/camera/CameraComponent';

const QrCode = () => {

  return (
    <PaperProvider theme={theme}>
    <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>

      </Pressable>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: "#313131"
    }
});

export default QrCode;
