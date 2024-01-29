import { createContext, useContext } from "react";
import useBlog from "../../../hooks/useBlog";

const blogCtx = createContext();
export default function BlogProvider({ children }) {
    return (
        <blogCtx.Provider value={{ ...useBlog() }}>
            {children}
        </blogCtx.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useBlogCtx = () => useContext(blogCtx);