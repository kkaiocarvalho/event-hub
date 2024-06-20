import { useQueryClient } from "@tanstack/react-query";
import { GetMeResponse } from "../api/requests/get-me";
import { QK_ME, UserPermissions } from "../utils/constants";

export function useUser() {
  const queryClient = useQueryClient();
  queryClient.refetchQueries({ queryKey: [QK_ME] });
  const user = queryClient.getQueryData<GetMeResponse>([QK_ME]);

  const hasOrganizerPermission =
    user?.permissao === UserPermissions["Organizer"] ||
    user?.permissao === UserPermissions["Admin"];

  return { user, hasOrganizerPermission };
}
