import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import * as React from "react";
import { ZodError } from "zod";
import {
  authenticate,
  type AuthenticateVariables,
  type AuthenticateResponse,
} from "../api/requests/authenticate";
import { AUTH_TOKEN } from "../utils/constants";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../utils/storage";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  InvalidDataSchemaResponse,
  RequestErrorWithMessage,
  RequestErrorSchema,
} from "../config/request";
type AuthError =
  | "UNKNOWN_ERROR"
  | "NETWORK_ERROR"
  | "CREDENTIALS_ERROR"
  | undefined;

type AuthContextValue = {
  login: (av: AuthenticateVariables) => void;
  logout: () => void;
  error: AuthError;
  loading: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext<AuthContextValue>({
  login: () => {},
  logout: () => {},
  error: undefined,
  loading: false,
  isAuthenticated: false,
});

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const authenticateMutation = useMutation({
    mutationFn: authenticate,
    onSuccess(response) {
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="success" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Login efetuado</ToastTitle>
                <ToastDescription>Seja bem vindo!</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      const data = response as AuthenticateResponse;
      setStorageItem(AUTH_TOKEN, data.token);
    },
    onError(error: RequestErrorSchema) {
      const message =
        (error as RequestErrorWithMessage)?.message ||
        (error as InvalidDataSchemaResponse)?.errors?.join(", ");
      configToast.closeAll();
      configToast.show({
        placement: "top",
        render: () => {
          return (
            <Toast action="error" variant="accent" top={insets.top}>
              <VStack space="xs">
                <ToastTitle>Erro durante o Login</ToastTitle>
                <ToastDescription>
                  {message ??
                    "Verifique suas credenciais e tente novamente mais tarde."}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    },
  });
  const queryClient = useQueryClient();

  React.useMemo(() => {
    getStorageItem(AUTH_TOKEN)
      .then((response) => setIsAuthenticated(!!response))
      .catch(() => setIsAuthenticated(false));
  }, [authenticateMutation.isPending]);

  function login(loginData: AuthenticateVariables) {
    authenticateMutation.mutate(loginData);
  }

  function logout() {
    removeStorageItem(AUTH_TOKEN);
    setIsAuthenticated(false);
    queryClient.clear();
  }

  const authError = (function getAuthError() {
    if (authenticateMutation.isError) {
      if (authenticateMutation.error instanceof ZodError) {
        return "UNKNOWN_ERROR";
      }
      const err = authenticateMutation.error as AxiosError;
      if (err.response) {
        return "CREDENTIALS_ERROR";
      }
      if (err.request && err.code === "ERR_NETWORK") {
        return "NETWORK_ERROR";
      }
      return "UNKNOWN_ERROR";
    }
  })();

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        error: authError,
        loading: authenticateMutation.isPending,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
