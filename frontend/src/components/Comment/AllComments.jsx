import React from 'react'
import { Trash, PencilSimple } from '@phosphor-icons/react'
import { useGlobalCtx } from '../../features/context/providers/Global/GlobalProvider';
import DelConfirmation from '../../components/shared/modal/DelConfirmation';
import EditModal from '../../components/Comment/EditModal';
import { shallowEqual, useSelector } from 'react-redux';
import { useCommentCtx } from '../../features/context/providers/Comment/CommentProvider';

export default function AllComments({ blogId = null }) {
    const { handleDelete } = useCommentCtx();
    const { openModal } = useGlobalCtx();
    const { comments, loading, } = useSelector((state) => ({
        comments: state.commentStore.comments,
        loading: state.commentStore.loading,
    }), shallowEqual);
    return (
        <>
            {
                loading ? <p>Fetching Comments</p> :
                    comments.length > 0 ? comments.map(comment =>
                        <div key={comment.id} className='my-3 p-3 border-gray-300 shadow-md'>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p>{comment.name}</p>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <button onClick={() => { openModal('updateComment', <EditModal blogId={blogId} id={comment.id} />) }}><PencilSimple size={18} /></button>
                                        <button className='text-red-600' onClick={() => { openModal('deleteComment', <DelConfirmation name='deleteComment' handleDelete={() => handleDelete(blogId, comment.id)} />) }}><Trash size={18} /></button>
                                    </div>
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        </div>) : <p className='font-semibold'>No comments to show</p>
            }
        </>
    )
}
