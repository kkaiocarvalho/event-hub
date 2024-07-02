import * as React from "react";
import { AuthContext } from "../contexts/AuthContext";
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within its context");
  }
  return context;
}
