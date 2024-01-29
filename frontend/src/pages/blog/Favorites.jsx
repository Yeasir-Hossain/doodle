import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Card from '../../components/Blog/Card';
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';

export default function Favorites() {
    const { getBlogs } = useBlogCtx();

    const { blogs, favorites } = useSelector(
        (state) => ({
            blogs: state.blogStore.blogs,
            favorites: state.favoriteStore.favorites,
        }),
        shallowEqual
    );

    useEffect(() => {
        getBlogs();
    }, [getBlogs]);

    const favoriteBlogs = useMemo(() => {
        return blogs.filter((b) => favorites.includes(b.id));
    }, [blogs, favorites]);

    return (
        <div className='w-full flex flex-col justify-center items-center min-h-screen gap-4'>
            <h1 className='text-2xl font-bold'>Favorite Blogs</h1>
            {favoriteBlogs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8'>
                    {favoriteBlogs.map((blog) => (
                        <Card key={blog.id} id={blog.id} title={blog.title} body={blog.body} favorite={true} />
                    ))}
                </div>
            ) : (
                <p className='font-semibold text-center'>
                    {favorites.length > 0 ? 'No favorite blogs to show' : 'No favorites added'}
                </p>
            )}
        </div>
    );
}
