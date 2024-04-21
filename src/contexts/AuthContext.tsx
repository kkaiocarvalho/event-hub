import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import * as React from "react";
import { ZodError } from "zod";
import {
  authenticate,
  type AuthenticateVariables,
  type AuthenticateResponse,
} from "../api/requests/authenticate";
import { navigateTo } from "../hook/NavigateTo";
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
  isAuthenticated: () => boolean;
};

export const AuthContext = React.createContext<AuthContextValue>({
  login: () => {},
  logout: () => {},
  error: undefined,
  loading: false,
  isAuthenticated: () => false,
});

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const configToast = useToast();
  const insets = useSafeAreaInsets();
  const { navigate } = navigateTo();
  const authenticateMutation = useMutation({
    mutationFn: authenticate,
  });
  const queryClient = useQueryClient();

  function login(loginData: AuthenticateVariables) {
    authenticateMutation.mutate(loginData, {
      onSuccess(response) {
        configToast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                nativeID="toasts-show"
                action="success"
                variant="accent"
                top={insets.top}
              >
                <VStack space="xs">
                  <ToastTitle>Login efetuado </ToastTitle>
                  <ToastDescription>Seja bem vindo!</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
        const data = response as AuthenticateResponse;
        setStorageItem(AUTH_TOKEN, data.token);
        setTimeout(() => {
          navigate("Home");
        }, 2000);
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
                    <ToastTitle>Erro durante o Login </ToastTitle>
                    <ToastDescription>{error.message}</ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
        }
      },
    });
  }

  function logout() {
    removeStorageItem(AUTH_TOKEN);
    queryClient.clear();
    navigate("StartScreen");
  }

  function isAuthenticated() {
    return Boolean(getStorageItem(AUTH_TOKEN));
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
