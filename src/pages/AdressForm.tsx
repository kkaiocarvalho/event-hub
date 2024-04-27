import { Box, Center, VStack, HStack } from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  getAddressByCode,
  type GetAddressByCodeResponse,
  type GetAddressByCodeVariables,
} from "../api/requests/get-address-by-code";
import { formatCEP, isValidCEP } from "@brazilian-utils/brazilian-utils";

type FormValues = {
  addressCode: string;
  uf: string;
  city: string;
  number: string;
  address: string;
  complement?: string | null;
};

const AddressSchema = yup.object({
  addressCode: yup
    .string()
    .required("CEP é obrigatório")
    .test("test-address-code", "CEP inválido", isValidCEP),
  uf: yup
    .string()
    .required("Sigla do estado é obrigatória")
    .max(2, "Sigla do estado deve ter no máximo 2 caracteres"),
  city: yup
    .string()
    .required("Cidade é obrigatória")
    .min(3, "Cidade deve ter no mínimo 3 caracteres")
    .max(50, "Cidade deve ter no máximo 50 caracteres"),
  number: yup.string().required("Número é obrigatório"),
  address: yup
    .string()
    .required("Logradouro é obrigatório")
    .min(4, "Logradouro deve ter no mínimo 4 caracteres")
    .max(50, "Logradouro deve ter no máximo 50 caracteres"),
  complement: yup
    .string()
    .max(100, "Complemento deve ter no máximo 100 caracteres")
    .notRequired(),
});

export function AddressForm() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<FormValues>({ resolver: yupResolver(AddressSchema) });

  const wathAddressCode = useWatch({ control }).addressCode;

  const isAddressCodeValid = wathAddressCode
    ? isValidCEP(wathAddressCode)
    : false;

  const getAddressByCodeMutation = useMutation({
    mutationFn: getAddressByCode,
    onSuccess(response) {
      const data = response as GetAddressByCodeResponse;
      console.log({ data });
      setValue("addressCode", data.cep);
      setValue("uf", data.uf);
      setValue("city", data.localidade);
      setValue("address", data.logradouro);
    },
    onError(err) {
      console.log({ err });
    },
  });

  const getAddress = () => {
    const data = getValues();
    if (!data) return;
    const body: GetAddressByCodeVariables = { addressCode: data.addressCode };
    getAddressByCodeMutation.mutate(body);
  };

  const handleButtonClick = () => {
    console.log("CLICOU EM CRIAR EVENTO");
  };

  return (
    <Background withScroll={true}>
      <VStack justifyContent="space-between">
        <Title text="Endereço" />
        <Center p="$3">
          <VStack w="$full">
            <HStack justifyContent="space-between" gap="$4">
              <Box w="$1/2">
                <Input
                  placeholder="00000-000"
                  format={formatCEP}
                  label="CEP"
                  inputName="addressCode"
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.addressCode?.message}
                />
              </Box>
              <Button
                action="primary"
                variant="solid"
                text="Buscar CEP"
                mt="$5"
                flex={1}
                isDisabled={!isAddressCodeValid}
                isLoading={getAddressByCodeMutation.isPending}
                onPress={getAddress}
              />
            </HStack>
            <Input
              placeholder="Ex.: Uberlândia"
              label="Cidade"
              inputName="city"
              control={control}
              isDisabled
              variant="outline"
              errorMessage={errors.city?.message}
            />
            <Input
              placeholder="Ex.: Rua ou Avenida"
              label="Logradouro"
              inputName="address"
              control={control}
              isDisabled
              errorMessage={errors.address?.message}
            />
            <HStack justifyContent="space-between" maxWidth="100%" gap="$4">
              <Box flex={1}>
                <Input
                  placeholder="Ex.: MG"
                  label="Sigla do Estado"
                  inputName="uf"
                  control={control}
                  isDisabled
                  errorMessage={errors.uf?.message}
                />
              </Box>
              <Box flex={1}>
                <Input
                  placeholder="Ex.: 0000"
                  label="Número"
                  inputName="number"
                  control={control}
                  errorMessage={errors.number?.message}
                />
              </Box>
            </HStack>
          </VStack>
          <Button
            action="primary"
            variant="solid"
            text="Cadastrar Evento"
            mt="$5"
            onPress={handleSubmit(handleButtonClick)}
          />
        </Center>
      </VStack>
    </Background>
  );
}
