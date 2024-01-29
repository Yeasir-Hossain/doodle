import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';
import Card from '../../components/Blog/Card';
import { Link } from 'react-router-dom';

export default function Blog() {
    const { getBlogs } = useBlogCtx();
    const { blogs } = useSelector((state) => ({
        blogs: state.blogStore.blogs,
        loading: state.blogStore.loading,
    }), shallowEqual);

    useEffect(() => {
        getBlogs();
    }, [])

    return (
        <div className='w-full flex flex-col justify-center items-center min-h-screen gap-4'>
            <h1 className='text-2xl font-bold'>Blogs</h1>
            {
                blogs.length > 0 ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8'>
                        {
                            blogs.map(blog => <Card key={blog.id} id={blog.id} title={blog.title} body={blog.body} />)
                        }
                    </div> :
                    <p className='font-semibold text-center'>No blogs to show</p>
            }
            <div className='flex justify-center items-center space-x-2'>
                <Link to='/add' className='bg-blue-600 px-5 py-1 font-semibold text-white'>
                    Add Blog
                </Link>
                <Link to='/favorites' className='bg-blue-600 px-5 py-1 font-semibold text-white'>
                    My Favorites
                </Link>
            </div>

        </div>
    )
}
