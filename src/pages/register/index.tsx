import { Text, StyleSheet, Pressable, Keyboard, TouchableOpacity} from 'react-native'
import React from 'react';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

import { AntDesign } from '@expo/vector-icons';

import theme from '../../components/theme/theme';

import { LinearGradient } from 'expo-linear-gradient';

import { useForm } from "react-hook-form";

const Register = () => {

    const navigation = useNavigation<StackTypes>();

    const { register, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        register('nome');
        register('cpf');
        register('telefone');
        register('email');
        register('password');
    }, [register]);

    const onSubmit = data => {
        console.log(data);
        navigation.navigate("Register");
    };

    return (
        <PaperProvider theme={theme}>
        <Pressable onPress={Keyboard.dismiss} style={styles.viewStyle}>
        <LinearGradient colors={['rgba(0, 255, 224, 0.9)', 'rgba(97, 0, 255, 0.9)']} 
        start={{x: 1, y: 0.1}}
        end={{x: 0.7, y: 0.83}}
        locations={[1,1]}
        style={styles.viewCardBack}>

        <TextInput style={styles.textInput}
            label="Nome Completo"
            onChangeText={nome => setValue('nome', nome)}
            mode='outlined'
            outlineColor="transparent"
            />

        <TextInput style={styles.textInput}
            label="CPF"
            onChangeText={cpf => setValue('cpf', cpf)}
            mode='outlined'
            outlineColor="transparent"
            />

        <TextInput style={styles.textInput}
            label="Telefone"
            onChangeText={telefone => setValue('telefone', telefone)}
            mode='outlined'
            outlineColor="transparent"
            />

        <TextInput
            style={styles.textInput}
            label="Email"
            onChangeText={email => setValue('email', email)}
            mode='outlined'
            outlineColor="transparent"
            />

        <TextInput style={styles.textInput}
            label="Senha"
            onChangeText={password => setValue('password', password)}
            mode='outlined'
            secureTextEntry={true}
            outlineColor="transparent"
            />

        <TouchableOpacity 
            style={styles.buttonRegister}
            onPress={handleSubmit(onSubmit)}
            >
            <Text style={styles.buttonLabel}>Finalizar Cadastro</Text>
            <AntDesign name="check" size={24} color="white" />
        </TouchableOpacity>


        </LinearGradient>
        </Pressable>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "#222222"
    },
    viewCardBack: {
        width: "100%",
        height:"100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
        position: "relative",
      },
    textInput: {
        width: 250,
        height: 30,
        marginBottom: 10,
        paddingVertical: 10,
        marginTop: 5,   
    },
    buttonRegister:{
        backgroundColor: "#6100FF",
        color: "black",
        marginBottom: 20,
        marginTop:50,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', 
        height:50,
        width:300,
        flexDirection: 'row',
    gap: 10
    },
    textTop:{
        fontSize: 25,
        color:"white"
    },
    buttonLabel: {
        fontSize: 30,
        color: "white",
    }
});

export default Register;
