import { useQueryClient } from "@tanstack/react-query";
import { GetMeResponse } from "../api/requests/get-me";
import { QK_ME, UserPermissions } from "../utils/constants";

export function useUser() {
  const queryClient = useQueryClient();
  // queryClient.refetchQueries({ queryKey: [QK_ME] });
  const userData = queryClient.getQueryData<GetMeResponse>([QK_ME]);

  const hasOrganizerPermission =
    userData?.permissao === UserPermissions["Organizer"] ||
    userData?.permissao === UserPermissions["Admin"];

  return { userData, hasOrganizerPermission };
}
