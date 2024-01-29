import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import BlogProvider from "./providers/Blog/BlogProvider";
import CommentProvider from "./providers/Comment/CommentProvider";
import GlobalProvider from "./providers/Global/GlobalProvider";
import FavoriteProvider from "./providers/Favorite/FavoriteProvider";

export default function Context({ children }) {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <GlobalProvider>
                    <BlogProvider>
                        <CommentProvider>
                            <FavoriteProvider>
                                {children}
                            </FavoriteProvider>
                        </CommentProvider>
                    </BlogProvider>
                </GlobalProvider>
            </Provider>
        </BrowserRouter>
    );
}