import {
    Box,
    Center,

    VStack,
    HStack
  } from "@gluestack-ui/themed";
  import { Background } from "../components/Background";
  import { Title } from "../components/Title";
  import { Input } from "../components/Input";
  import { Button } from "../components/Button";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useMutation } from "@tanstack/react-query";
import { getAddressByCode, type GetAddressByCodeResponse, type GetAddressByCodeVariables } from "../api/requests/get-address-by-code";
  
  type FormValues = {
    addressCode: string;
    uf: string;
    city: string;
    number: string;
    address: string;
    complement: string;
  };
  
  const AddressSchema = yup.object({
    addressCode: yup
      .string()
      .required('CEP é obrigatório')
      .matches(/^\d{8}$/, 'CEP inválido'),
      uf: yup
      .string()
      .required('Sigla do estado é obrigatória')
      .max(2, 'Sigla do estado deve ter no máximo 2 caracteres'),
    city: yup
      .string()
      .required('Cidade é obrigatória')
      .min(3, 'Cidade deve ter no mínimo 3 caracteres')
      .max(50, 'Cidade deve ter no máximo 50 caracteres'),
    number: yup
      .string()
      .required('Número é obrigatório')
      .matches(/^\d{1,6}$/, 'Número inválido'),
    address: yup
      .string()
      .required('Logradouro é obrigatório')
      .min(4, 'Logradouro deve ter no mínimo 4 caracteres')
      .max(50, 'Logradouro deve ter no máximo 50 caracteres'),
    complement: yup
      .string()
      .max(100, 'Complemento deve ter no máximo 100 caracteres')
      .notRequired(),
  });
  
  export function AddressForm() {
    const {
      formState: { errors },
      control,
      handleSubmit,
      setValue,
    } = useForm<FormValues>({ resolver: yupResolver(AddressSchema) });
  


    const getAddressByCodeMutation = useMutation({
        mutationFn: getAddressByCode,
        onSuccess(response : GetAddressByCodeResponse) {
            const { data } = response;
            setValue('addressCode', data.cep);
            setValue('uf', data.uf);
            setValue('city', data.localidade);
            setValue('address', data.logradouro);
        },
    })


    const getAddress = (data: FormValues) =>{ 
      if(!data) return;
      getAddressByCodeMutation.mutate({addressCode : data.addressCode})}

    const handleButtonClick = () => {
      console.log("CLICOU EM CRIAR EVENTO");
    };
  
          return(
            <Background withScroll={true}>
                <VStack justifyContent="space-between">
                <Title text="Endereço" />
                    <Center  p="$3">
                        <VStack w="$full">
                        <HStack justifyContent="space-between">
                            <Box w="$1/2">
                                <Input placeholder="00000-000" label="CEP" inputName="numeroCEP" control={control} errorMessage={errors.addressCode?.message} />
                            </Box>
                            <Button action="primary" variant="solid" text="Buscar CEP" mt="$5"  onPress={handleSubmit(getAddress)} />
                        </HStack>
                        <Input placeholder="Ex.: Uberlândia" label="Cidade" inputName="city" control={control} errorMessage={errors.city?.message}/>
                        <Input placeholder="Rua ou Avenida" label="Logradouro" inputName="address" control={control} errorMessage={errors.address?.message} />
                        <HStack justifyContent="space-between">
                        <Box p="$2" w="$1/2">
                                <Input placeholder="MG GO SP RJ MT" label="Sigla do Estado" inputName="uf" control={control} errorMessage={errors.uf?.message} />
                        </Box>
                        <Box p="$2" w="$1/2">
                                <Input placeholder="Nº 0000" label="Número" inputName="number" control={control} errorMessage={errors.number?.message}/>
                        </Box>
                        </HStack>
                        </VStack>
                        <Button action="primary" variant="solid" text="Cadastrar Evento" mt="$5" onPress={handleButtonClick} />
                    </Center>
                </VStack>
            </Background>
  );
}

