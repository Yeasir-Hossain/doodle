import React from 'react'
import { useCommentCtx } from '../../features/context/providers/Comment/CommentProvider';

export default function AddComment({ blogId }) {
    const { handleCreate } = useCommentCtx();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, body } = e.target.elements;

        try {
            await handleCreate(blogId, {
                name: name.value,
                email: email.value,
                body: body.value,
            });

            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <p>Add a comment</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3'>
                <input type="text" required name="name" placeholder='name' className='px-2 border rounded-sm' />
                <input type="email" required name="email" placeholder='email' className='px-2 border rounded-sm' />
                <textarea required name="body" placeholder='comment' className='max-h-56 px-2 border rounded-sm' />
                <input type="submit" className='bg-blue-600 rounded-md px-5 py-1 text-white hover:cursor-pointer' />
            </form>
        </>
    )
}
