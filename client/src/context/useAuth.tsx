import React from "react";
import { UserContext } from "../providers/UserProvider";

export const useAuth = () => React.useContext(UserContext);