import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, TouchableOpacity, } from 'react-native';
import { TextInput, Provider as PaperProvider, HelperText } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import { useForm } from "react-hook-form";

import theme from '../../components/theme/theme';
import logo from '../../components/theme/logo';

import DateTimePicker from "react-native-modal-datetime-picker";

const CreateEvent = () => {

  const navigation = useNavigation<StackTypes>();
  const { register, handleSubmit, setValue } = useForm();
  const [nomeEvento, setNomeEvento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    SetDate(date);
    hideDatePicker();
  };

  React.useEffect(() => {
    register('nomeEvento');
    register('endereco');
    register('data');
    register('descricao');
  }, [register]);

  const onSubmit = data => {
    console.log(data);
    navigation.navigate("MyBottomTabs");
  };

  return (
    <PaperProvider theme={theme}>
      <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        <View style={styles.viewForm}>
          <Text style={styles.textTop}>Crie um Evento</Text>
          <TextInput
            style={styles.textInput}
            label="Nome"
            onChangeText={text => {
              setNomeEvento(text);
              setValue('nomeEvento', text);
            }}
            mode='outlined'
            outlineColor="transparent"
          />
          <HelperText type="error" visible={!nomeEvento} style={styles.helperText}>
            Insira o nome do evento
          </HelperText>

          <TextInput
            style={styles.textInput}
            label="Endereço"
            onChangeText={text => {
              setEndereco(text);
              setValue('endereco', text);
            }}
            mode='outlined'
            outlineColor="transparent"
          />
          <HelperText type="error" visible={!endereco} style={styles.helperText}>
            Insira um endereço
          </HelperText>

          <TextInput
            style={styles.textInput}
            label="Data"
            value={date}
            onChangeText={date => {
              setDate(date);
              setValue('data', date);
            }}
            mode="outlined"
            placeholder="dd/mm/yyyy"
            keyboardType='numeric'
          />
          <HelperText type="error" visible={!date} style={styles.helperText}>
            Selecione a data que acontecerá o evento
          </HelperText>

          <TextInput
            style={styles.textInput}
            label="Descrição"
            onChangeText={text => {
              setDescricao(text);
              setValue('descricao', text);
            }}
            mode='outlined'
            outlineColor="transparent"
          />
          <HelperText type="error" visible={!descricao} style={styles.helperText}>
            Insira uma descrição para seu evento. Por exemplo: Quando começa e quando termina!
          </HelperText>

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonLabel}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </Pressable>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#222222"
  },
  viewForm: {
    width: "90%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    zIndex: -1,
    position: "relative",
    marginBottom: 30,
    borderRadius: 10,
    padding: 40,
  },
  imageBackground: {
    width: '50%',
    height: 150,
  },
  textInput: {
    width: 250,
    height: 30,
    paddingVertical: 10, 
    marginBottom: 20,
    marginTop: 10,
  },
  buttonLogin: {
    backgroundColor: "#00FFE0",
    marginTop: 20,
    borderRadius: 5,
    padding: 0,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTop: {
    fontSize: 25,
    color: "white",
  },
  buttonLabel: {
    fontSize: 30,
    color: "black",
  },
  textTop: {
    fontSize: 40,
    color: 'white',
    marginBottom: 30
  },
  helperText:{
    color: 'white',
    fontSize: 15,
    marginTop: -15
  }
});

export default CreateEvent;
