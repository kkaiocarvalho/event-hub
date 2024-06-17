import {
  Box,
  Center,
  VStack,
  HStack,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { Background } from "../components/Background";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { UseFormReturn, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAddressByCode,
  type GetAddressByCodeResponse,
  type GetAddressByCodeVariables,
} from "../api/requests/get-address-by-code";
import { formatCEP, isValidCEP } from "@brazilian-utils/brazilian-utils";
import { EventFormValues } from "./CreateEvent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QK_RECENT_ADDRESSES } from "../utils/constants";
import {
  getAddresses,
  GetAddressesResponse,
} from "../api/requests/get-addresses";
import { ScrollView } from "@gluestack-ui/themed";

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

  const recentAddressesQuery = useQuery({
    queryKey: [QK_RECENT_ADDRESSES],
    queryFn: getAddresses,
  });

  const recentAddresses =
    (recentAddressesQuery.data as GetAddressesResponse) ?? [];
  // const recentAddresses: GetAddressesResponse = [
  //   {
  //     cdEnderecoEvento: 0,
  //     estado: "MG",
  //     cidade: "Uberlândia",
  //     cep: "38401528",
  //     nuEndereco: "1539",
  //     logradouro: "Marta Helena, Av. Quilombo dos Palmares",
  //     dsEndereco: "Perto da Gontijo",
  //     dtInclusao: "2024-02-16T03:37:26",
  //   },
  //   {
  //     cdEnderecoEvento: 2,
  //     estado: "RJ",
  //     cidade: "Belford Roxo",
  //     cep: "38401528",
  //     nuEndereco: "47",
  //     logradouro: "Av. Kalashinikov",
  //     dsEndereco: "rastros de 7.62 na entrada",
  //     dtInclusao: "2024-02-16T03:37:26",
  //   },
  //   {
  //     cdEnderecoEvento: 4,
  //     estado: "SP",
  //     cidade: "São Paulo",
  //     cep: "38401528",
  //     nuEndereco: "8888",
  //     logradouro: "Rua da fumaça",
  //     dsEndereco: "perto da fábrica de poluição",
  //     dtInclusao: "2024-02-16T03:37:26",
  //   },
  //   {
  //     cdEnderecoEvento: 6,
  //     estado: "AM",
  //     cidade: "Catinguelê",
  //     cep: "38401528",
  //     nuEndereco: "2323",
  //     logradouro: "Lagoa do mato",
  //     dsEndereco: "Duas árvores a esquerda da palmeira",
  //     dtInclusao: "2024-02-16T03:37:26",
  //   },
  //   {
  //     cdEnderecoEvento: 8,
  //     estado: "GO",
  //     cidade: "Caldas Novas",
  //     cep: "38401528",
  //     nuEndereco: "444",
  //     logradouro: "rua das águas quentes",
  //     dsEndereco: "atrás do show sertanejo",
  //     dtInclusao: "2024-02-16T03:37:26",
  //   },
  // ];

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
        configToast.closeAll();
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast action="error" variant="accent" top={insets.top}>
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

  const setAddress = (item: (typeof recentAddresses)[0]) => {
    form.setValue("addressForm.addressCode", item.cep);
    form.setValue("addressForm.city", item.cidade);
    form.setValue("addressForm.complement", item.dsEndereco);
    form.setValue("addressForm.uf", item.estado);
    form.setValue("addressForm.address", item.logradouro);
    form.setValue("addressForm.number", item.nuEndereco);
    form.setValue("addressForm.id", item.cdEnderecoEvento);
  };

  const isDisabled = !isAddressCodeValid || getAddressByCodeMutation.isPending;

  return (
    <Background withScroll={true} withKeyboardDimiss>
      {recentAddresses.length ? (
        <VStack>
          <Title text="Ultimos endereços" />

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            maxHeight="$56"
            overflow="scroll"
          >
            {recentAddresses.map((item, index) => (
              <Pressable
                onPress={() => setAddress(item)}
                key={`recent-address-${index}`}
              >
                <HStack
                  bgColor="$primary600"
                  alignItems="center"
                  gap="$2"
                  borderRadius="$2xl"
                  p="$2"
                  mb={index <= recentAddresses.length ? "$2" : "$0"}
                >
                  <VStack flex={1} gap="$2">
                    <Text
                      textAlign="center"
                      color="$textColor"
                      display="flex"
                      isTruncated
                    >
                      {item.cidade}
                    </Text>
                    <Text textAlign="center" color="$textColor" display="flex">
                      {item.estado}
                    </Text>
                  </VStack>
                  <VStack flex={2} alignItems="flex-start">
                    <Text
                      textAlign="center"
                      color="$textColor"
                      display="flex"
                      fontSize="$sm"
                      flex={1}
                      isTruncated
                    >
                      {item.logradouro}
                    </Text>
                    <Text
                      textAlign="center"
                      color="$textColor"
                      display="flex"
                      fontSize="$sm"
                    >
                      Nº: {item.nuEndereco}
                    </Text>

                    <Text
                      textAlign="center"
                      color="$textColor"
                      display="flex"
                      fontSize="$sm"
                    >
                      CEP: {item.cep}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            ))}
          </ScrollView>
        </VStack>
      ) : null}

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
              isDisabled={isDisabled}
              variant="outline"
              errorMessage={errors.addressForm?.city?.message}
            />
            <Input
              placeholder="Ex.: Rua ou Avenida"
              label="Logradouro"
              inputName="addressForm.address"
              control={control}
              isDisabled={isDisabled}
              errorMessage={errors.addressForm?.address?.message}
            />
            <HStack justifyContent="space-between" gap="$4" >
            <Box w="$1/3">
              <Input
                placeholder="Ex.: MG"
                label="Sigla do Estado"
                inputName="addressForm.uf"
                control={control}
                isDisabled={isDisabled}
                errorMessage={errors.addressForm?.uf?.message}
              />
            </Box>
            <Box w="$1/2">
              <Input
                placeholder="Ex.: 0000"
                label="Número"
                inputName="addressForm.number"
                isDisabled={isDisabled}
                control={control}
                errorMessage={errors.addressForm?.number?.message}
              />
            </Box>
            </HStack>
            <Input
              placeholder="Centro de convenções"
              label="Complemento"
              inputName="addressForm.complement"
              isDisabled={isDisabled}
              control={control}
              errorMessage={errors.addressForm?.complement?.message}
            />
          </VStack>
        </Center>
      </VStack>
    </Background>
  );
}
