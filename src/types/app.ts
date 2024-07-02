export type LocationState = {
  authRequired?: boolean;
  toast?: {
    status: "error" | "success" | "info" | "warning";
    description: string;
  };
} | null;
