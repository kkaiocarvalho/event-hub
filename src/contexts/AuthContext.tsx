import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import * as React from "react";
import { ZodError } from "zod";
import {
  AuthenticateResponse,
  AuthenticateVariables,
  authenticate,
} from "../api/requests/autenticate";
import { AUTH_TOKEN, QK_ME } from "../utils/constants";
import { getMe } from "../api/requests/get-me";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../routes/routes";

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

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigation<StackTypes>().navigate;
  const authenticateMutation = useMutation({
    mutationFn: authenticate,
  });

  const queryClient = useQueryClient();

  const getMeQuery = useQuery({
    queryKey: [QK_ME],
    queryFn: getMe,
    staleTime: Infinity,
    enabled: isAuthenticated(),
  });

  function login(loginData: AuthenticateVariables) {
    authenticateMutation.mutate(loginData, {
      onSuccess(data) {
        setStorageItem(AUTH_TOKEN, data.token);
        //TODO: navigate to home
        navigate("MyBottomTabs");
      },
    });
  }

  function logout() {
    removeStorageItem(AUTH_TOKEN);
    queryClient.clear();
    //TODO: navigate to login
    navigate("Login");
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
