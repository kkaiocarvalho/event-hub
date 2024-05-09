import {
  Box,
  Center,
  VStack,
  HStack,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { UseFormReturn, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  getAddressByCode,
  type GetAddressByCodeResponse,
  type GetAddressByCodeVariables,
} from "../api/requests/get-address-by-code";
import { formatCEP, isValidCEP } from "@brazilian-utils/brazilian-utils";
import { EventFormValues } from "./CreateEvent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AddressFormProps = {
  form: UseFormReturn<EventFormValues>;
};

export function AddressForm({ form }: AddressFormProps) {
  const {
    formState: { errors },
    control,
  } = form;
  const configToast = useToast();
  const insets = useSafeAreaInsets();

  const wathAddressCode = useWatch({ control }).addressForm?.addressCode;

  const isAddressCodeValid = wathAddressCode
    ? isValidCEP(wathAddressCode)
    : false;

  const getAddressByCodeMutation = useMutation({
    mutationFn: getAddressByCode,
    onSuccess(response) {
      const data = response as GetAddressByCodeResponse;
      form.setValue("addressForm.addressCode", data.cep);
      form.setValue("addressForm.uf", data.uf);
      form.setValue("addressForm.city", data.localidade);
      form.setValue("addressForm.address", data.logradouro);
    },
    onError(error) {
      if (error.message) {
        configToast.close("toasts-show");
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                nativeID="toasts-show"
                action="error"
                variant="accent"
                top={insets.top}
              >
                <VStack space="xs">
                  <ToastTitle>Erro durante a busca do CEP </ToastTitle>
                  <ToastDescription>
                    Tente novamente mais tarde.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    },
  });

  const getAddress = () => {
    const data = form.getValues();
    if (!data) return;
    const body: GetAddressByCodeVariables = {
      addressCode: data.addressForm.addressCode,
    };
    getAddressByCodeMutation.mutate(body);
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
                  inputName="addressForm.addressCode"
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.addressForm?.addressCode?.message}
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
              inputName="addressForm.city"
              control={control}
              isDisabled
              variant="outline"
              errorMessage={errors.addressForm?.city?.message}
            />
            <Input
              placeholder="Ex.: Rua ou Avenida"
              label="Logradouro"
              inputName="addressForm.address"
              control={control}
              isDisabled
              errorMessage={errors.addressForm?.address?.message}
            />
            <HStack justifyContent="space-between" maxWidth="100%" gap="$4">
              <Box flex={1}>
                <Input
                  placeholder="Ex.: MG"
                  label="Sigla do Estado"
                  inputName="addressForm.uf"
                  control={control}
                  isDisabled
                  errorMessage={errors.addressForm?.uf?.message}
                />
              </Box>
              <Box flex={1}>
                <Input
                  placeholder="Ex.: 0000"
                  label="Número"
                  inputName="addressForm.number"
                  control={control}
                  errorMessage={errors.addressForm?.number?.message}
                />
              </Box>
            </HStack>
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
