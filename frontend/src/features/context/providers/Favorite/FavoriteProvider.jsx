import { createContext, useContext } from "react";
import useFavorites from "../../../hooks/useFavorites";

const favoriteCtx = createContext();
export default function FavoriteProvider({ children }) {
    return (
        <favoriteCtx.Provider value={{ ...useFavorites() }}>
            {children}
        </favoriteCtx.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useFavoriteCtx = () => useContext(favoriteCtx);