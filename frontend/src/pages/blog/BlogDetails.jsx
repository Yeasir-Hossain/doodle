import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useCommentCtx } from '../../features/context/providers/Comment/CommentProvider';
import { useBlogCtx } from '../../features/context/providers/Blog/BlogProvider';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setValue as setSingleBlog } from '../../features/redux/reducers/blogReducer';
import { setValue } from '../../features/redux/reducers/commentReducer';
import AllComments from '../../components/Comment/AllComments';
import AddComment from '../../components/Comment/AddComment';

export default function BlogDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { getblogsComments } = useCommentCtx();
    const { getSingleBlog } = useBlogCtx();
    const { blog } = useSelector((state) => ({
        blog: state.blogStore.singleBlog,
    }), shallowEqual);


    useEffect(() => {
        getSingleBlog(id);
        getblogsComments(id);

        return () => {
            dispatch(setSingleBlog({ target: 'singleBlog', value: {} }))
            dispatch(setValue({ target: 'comments', value: [] }))
        }
    }, [id]);

    return (
        <div className='w-full flex flex-col justify-center my-5 border rounded-md shadow-md p-5 max-w-screen-md mx-auto'>
            {
                !blog.title ? <p>Wrong Blog id</p> :
                    <div>
                        <h1 className='text-2xl font-bold'>{blog.title}</h1>
                        <p>{blog.body}</p>
                    </div>
            }
            <div className='max-w-screen-sm mt-3'>
                <AllComments blogId={id} />
                <AddComment blogId={id} />
            </div>
        </div>
    )
}
