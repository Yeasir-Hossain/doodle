import React from 'react'
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';

export default function AddBlog() {
    const { handleCreate } = useBlogCtx();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, title, body } = e.target.elements;

        try {
            await handleCreate({
                email: email.value,
                title: title.value,
                body: body.value,
            });

            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='max-w-screen-sm mx-auto mt-20'>
            <div className='border shadow-md p-5'>
                <p className='font-semibold text-center'>Add a Blog</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" required name="email" placeholder='email' className='px-2 border rounded-sm' />
                    <label htmlFor="title">Title:</label>
                    <input type="text" required name="title" placeholder='title' className='px-2 border rounded-sm' />
                    <label htmlFor="body">Details:</label>
                    <textarea required name="body" placeholder='Details' className='max-h-96 px-2 border rounded-sm' rows={5} />
                    <input type="submit" className='bg-blue-600 rounded-md px-5 py-1 text-white hover:cursor-pointer' />
                </form>
            </div>

        </div>
    )
}
