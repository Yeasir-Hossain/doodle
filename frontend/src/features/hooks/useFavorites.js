import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteFavorite, insertFavorite } from "../redux/reducers/favoriteReducer";

export default function useFavorites() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFavoritesFromStorage();
    }, []);

    const fetchFavoritesFromStorage = () => {
        const storedFavorites = localStorage.getItem('favorites');
        const favoriteIdsFromStorage = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (favoriteIdsFromStorage.length > 0) {
            dispatch(insertFavorite(favoriteIdsFromStorage));
        }
    };

    const updateStorage = (favoriteIds) => {
        localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    };

    const handleInsert = (id) => {
        const storedFavorites = localStorage.getItem('favorites');
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
        if (!favoriteIds.includes(id)) {
            favoriteIds.push(id);
            updateStorage(favoriteIds);
            dispatch(insertFavorite(favoriteIds));
        }
    };

    const handleDelete = (id) => {
        const storedFavorites = localStorage.getItem('favorites');
        let favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
        favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== id);

        updateStorage(favoriteIds);
        dispatch(deleteFavorite(id));
    };

    return {
        handleInsert,
        handleDelete,
    };
}
