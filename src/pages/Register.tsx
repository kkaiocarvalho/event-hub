import React, { useState } from 'react';
import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  EditIcon,
  HStack,
  Icon,
  RemoveIcon,
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputField,
  Input,
  AlertCircleIcon
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../routes/routes";

import {Image, TouchableWithoutFeedback, Keyboard, Share, Vibration } from "react-native";

export function Register() {


  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const validateFields = () => {
    if (!nome || !cpf || !email || !senha) {
      Vibration.vibrate();
      return false;
    }
    return true;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center h="$full" bg="$background">
      <VStack w="50%" pb="$10" gap="$5" >

        <FormControl
             size="md"
             isDisabled={false}
             isInvalid={false}
             isReadOnly={false}
             isRequired={false}
             >

          <FormControlLabel mb="$1">
          <FormControlLabelText>Nome</FormControlLabelText>
          </FormControlLabel>
          <Input>
          <InputField type="text" placeholder="Nome"/>
          </Input>
          <FormControlHelper>
          <FormControlHelperText>
            Insira seu nome completo.
          </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                É necessário informar seu nome verdadeiro.
              </FormControlErrorText>
          </FormControlError>

          <FormControlLabel mb="$1">
          <FormControlLabelText>CPF</FormControlLabelText>
          </FormControlLabel>
          <Input>
          <InputField type="text" placeholder="CPF"/>
          </Input>
          <FormControlHelper>
          <FormControlHelperText>
            Insira o seu CPF.
          </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                É necessário informar seu CPF.
              </FormControlErrorText>
          </FormControlError>

          <FormControlLabel mb="$1">
          <FormControlLabelText>E-mail</FormControlLabelText>
          </FormControlLabel>
          <Input>
          <InputField type="text" placeholder="E-mail"/>
          </Input>
          <FormControlHelper>
          <FormControlHelperText>
            Insira o seu e-mail.
          </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                É necessário informar um e-mail válido para receber informações.
              </FormControlErrorText>
          </FormControlError>

          <FormControlLabel mb="$1">
          <FormControlLabelText>Senha</FormControlLabelText>
          </FormControlLabel>
          <Input>
          <InputField type="password" placeholder="Senha"/>
          </Input>
          <FormControlHelper>
          <FormControlHelperText>
            Crie uma senha.
          </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                É necessário ter mais de 6 caracteres.
              </FormControlErrorText>
          </FormControlError>

        </FormControl>
      </VStack>
      </Center>
      </TouchableWithoutFeedback>

  );
}
