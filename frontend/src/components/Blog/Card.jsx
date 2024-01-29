import React from 'react';
import { useGlobalCtx } from '../../features/context/providers/Global/GlobalProvider';
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';
import DelConfirmation from '../shared/modal/DelConfirmation';
import { Trash, Pencil, Heart } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { useFavoriteCtx } from '../../features/context/providers/Favorite/FavoriteProvider';

export default function Card({ id = null, title = '', body = '', favorite = false }) {
    const { handleDelete } = useBlogCtx();
    const { openModal } = useGlobalCtx();
    const { handleInsert, handleDelete: handleFavoriteDelete } = useFavoriteCtx();
    const favorites = useSelector(state => state.favoriteStore.favorites, shallowEqual);
    const isFavorite = favorites.includes(id);

    const handleFavorite = (id) => {
        if (isFavorite) {
            // Remove from favorites
            handleFavoriteDelete(id);
        } else {
            // Add to favorites
            handleInsert(id);
        }
    };

    return (
        <div className='relative z-0 p-5 rounded-md shadow-lg border'>
            <h2 className='text-xl font-semibold'>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</h2>
            <p>{body.slice(0, 30)}...</p>
            {
                !favorite && <div className='absolute top-[-14px] right-[-10px] z-50 space-x-2 flex items-center'>
                    <button className='bg-white' onClick={() => handleFavorite(id)}>
                        <Heart size={24} weight={isFavorite ? 'fill' : 'regular'} fill={isFavorite ? 'red' : 'black'} />
                    </button>
                    <Link to={`/update/${id}`}>
                        <button className='bg-green-600 text-white rounded-full p-1'>
                            <Pencil size={18} />
                        </button>
                    </Link>
                    <button
                        className='bg-red-600 text-white rounded-full p-1'
                        onClick={() => openModal('deleteBlog', <DelConfirmation name='deleteBlog' handleDelete={() => handleDelete(id)} />)}
                    >
                        <Trash size={18} />
                    </button>
                </div>
            }

            <Link to={`/blog/${id}`} className='underline'>Read More</Link>
        </div>
    );
}
