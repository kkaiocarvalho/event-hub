import { useQuery } from "@tanstack/react-query";
import { getMe, GetMeResponse } from "../api/requests/get-me";
import { QK_ME, UserPermissions } from "../utils/constants";

export function useUser() {
  const getMeQuery = useQuery({ queryKey: [QK_ME], queryFn: getMe });
  const userData: GetMeResponse | undefined =
    (getMeQuery.data as GetMeResponse) || undefined;

  const hasOrganizerPermission =
    userData?.permissao === UserPermissions["Organizer"] ||
    userData?.permissao === UserPermissions["Admin"];

  return { user: userData, hasOrganizerPermission };
}
