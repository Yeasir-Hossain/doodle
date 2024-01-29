import React, { useEffect } from 'react'
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';
import { setValue } from '../../features/redux/reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

export default function UpdateBlog() {
    const { getSingleBlog, handleUpdate } = useBlogCtx();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { blog } = useSelector((state) => ({
        blog: state.blogStore.singleBlog,
    }), shallowEqual);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, body } = e.target.elements;

        try {
            await handleUpdate(id, {
                title: title.value,
                body: body.value,
            });

            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleBlog(id);

        return () => {
            dispatch(setValue({ target: 'singleBlog', value: {} }))
        }
    }, [id]);

    return (
        <div className='max-w-screen-sm mx-auto mt-20'>
            <div className='border shadow-md p-5'>
                <p className='font-semibold text-center'>Update Blog</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" required name="email" placeholder='email' className='px-2 border rounded-sm' defaultValue={blog?.user?.email} disabled />
                    <label htmlFor="title">Title:</label>
                    <input type="text" required name="title" placeholder='title' className='px-2 border rounded-sm' defaultValue={blog.title} />
                    <label htmlFor="body">Details:</label>
                    <textarea required name="body" placeholder='Details' className='max-h-96 px-2 border rounded-sm' rows={5} defaultValue={blog.body} />
                    <input type="submit" className='bg-blue-600 rounded-md px-5 py-1 text-white hover:cursor-pointer' />
                </form>
            </div>

        </div>
    )
}
