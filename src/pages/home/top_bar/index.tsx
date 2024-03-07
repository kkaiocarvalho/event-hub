import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import TopBars from '../../../routes/topbars';

import theme from '../../../components/theme/theme';

const EventsTop = () => {
  return (
      <PaperProvider theme={theme}>
        <TopBars/>
      </PaperProvider>   
  );
}



const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: "#313131"
    },
    textTitle: {
      color: 'white',
      fontSize: 30,
      marginBottom: '140%'
    }
});

export default EventsTop;
