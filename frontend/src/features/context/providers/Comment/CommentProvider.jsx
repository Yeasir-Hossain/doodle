import { createContext, useContext } from "react";
import useComment from "../../../hooks/useComment";

const commentCtx = createContext();
export default function CommentProvider({ children }) {
    return (
        <commentCtx.Provider value={{ ...useComment() }}>
            {children}
        </commentCtx.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentCtx = () => useContext(commentCtx);