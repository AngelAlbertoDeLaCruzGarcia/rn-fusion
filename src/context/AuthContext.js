import {createContext} from "react";

const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    loguot: () => null,
});
export default AuthContext;