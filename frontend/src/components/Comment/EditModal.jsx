import React from 'react'
import { useGlobalCtx } from '../../features/context/providers/Global/GlobalProvider';
import { shallowEqual, useSelector } from 'react-redux';
import { useCommentCtx } from '../../features/context/providers/Comment/CommentProvider';

export default function EditModal({ blogId = null, id = null }) {
    const { closeModal } = useGlobalCtx();
    const { handleUpdate } = useCommentCtx();
    const { comment } = useSelector((state) => ({
        comment: state.commentStore.comments.find(comment => comment.id === id),
    }), shallowEqual);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, body } = e.target.elements;

        try {
            await handleUpdate(blogId, id, {
                name: name.value,
                body: body.value,
            });

            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='shadow-lg border border-gray-800 w-[350px] max-h-max bg-white rounded p-5'>
            <h5 className="font-bold text-center uppercase py-2">Delete</h5>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3'>
                <label htmlFor="name">Name:</label>
                <input type="text" required name="name" placeholder='name' className='px-2 border rounded-sm' defaultValue={comment.name} />
                <label htmlFor="email">Email:</label>
                <input type="email" required name="email" placeholder='email' className='px-2 border rounded-sm' disabled defaultValue={comment.email} />
                <label htmlFor="body">Body:</label>
                <textarea required name="body" placeholder='comment' className='max-h-56 px-2 border rounded-sm' defaultValue={comment.body} />
                <div className='pt-3 flex justify-end gap-4'>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        closeModal('updateComment');
                    }} className='text-sm font-bold px-3 py-1 bg-red-600 rounded text-white'>Cancel</button>
                    <input type="submit" className='text-sm font-bold px-3 py-1 bg-blue-600 rounded cursor-pointer text-white' value='Update' />
                </div>
            </form>
        </div>
    );
}
