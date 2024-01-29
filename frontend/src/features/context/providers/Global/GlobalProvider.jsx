import { createContext, useContext } from "react";
import useModal from "../../../hooks/useModal";

const globalCtx = createContext();
export default function GlobalProvider({ children }) {
    return (
        <globalCtx.Provider value={{ ...useModal() }}>
            {children}
        </globalCtx.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalCtx = () => useContext(globalCtx);