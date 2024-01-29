import req from "../../utils/req";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createComment, deleteComment, setValue, updateComment } from "../redux/reducers/commentReducer";
import hitToast from "../../utils/hitToast";
import { useGlobalCtx } from "../context/providers/Global/GlobalProvider";

/**
 * Custom hook for managing comments, including fetching, creating, updating, and deleting comments,
 * and caching comments for efficient data retrieval.
 *
 * @returns {Object} An object containing functions for handling comments.
 */
export default function useComment() {
    const dispatch = useDispatch();
    const { comments } = useSelector((state) => ({
        comments: state.commentStore.comments,
    }), shallowEqual);
    const { closeModal } = useGlobalCtx();

    /**
     * Update the cache for a specific blog with new comment data.
     *
     * @param {string} blogId - The ID of the blog associated with the comments.
     * @param {Array} newData - The new comment data to update the cache with.
     * @returns {void}
     */
    const updateCache = async (blogId, newData) => {
        try {
            const cache = await caches.open('blogCommentsCache');
            await cache.put(`comment/${blogId}`, new Response(JSON.stringify(newData)));
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Fetch blog comments and update both the state and cache.
     *
     * @param {string} blogId - The ID of the blog for which to fetch comments.
     * @returns {void}
     */
    const getblogsComments = async (blogId) => {
        try {
            const cache = await caches.open('blogCommentsCache');

            // Check if the response is available in the cache
            const cachedResponse = await cache.match(`comment/${blogId}`);

            if (cachedResponse) {
                const cachedData = await cachedResponse.json();
                dispatch(setValue({ target: 'comments', value: cachedData }));
                return;
            }

            const abrtCtrl = new AbortController();

            // If not in the cache, make a request to the backend
            dispatch(setValue({ target: 'loading', value: true }));
            const response = await req({ uri: `comment/${blogId}`, signal: abrtCtrl.signal });
            const newData = response.data;

            // Save the response in the cache
            updateCache(blogId, newData);

            // Update the state with the new data
            dispatch(setValue({ target: 'comments', value: newData }));
        } catch (error) {
            console.error(error);
            hitToast('Failed to load comments', 'error');
        } finally {
            dispatch(setValue({ target: 'loading', value: false }));
        }
    };

    /**
     * Create a new comment for a specific blog and update both the state and cache.
     *
     * @param {string} blogId - The ID of the blog for which to create a comment.
     * @param {Object} data - The data of the new comment.
     * @returns {void}
     */
    const handleCreate = (blogId, data) => {
        req({ method: 'POST', uri: `comment/${blogId}`, data })
            .then(({ data }) => {
                if (data.id) {
                    dispatch(createComment(data));
                    updateCache(blogId, [...comments, data]);
                    hitToast('Added Successfully', 'success');
                }
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to add', 'error');
            });
    };

    /**
     * Delete a comment for a specific blog and update both the state and cache.
     *
     * @param {string} blogId - The ID of the blog for which to delete a comment.
     * @param {string} id - The ID of the comment to delete.
     * @returns {void}
     */
    const handleDelete = (blogId, id) => {
        req({ method: 'DELETE', uri: `comment/${id}` })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(deleteComment(id));
                    closeModal('deleteComment');
                    updateCache(blogId, comments.filter(comment => comment.id !== id));
                    hitToast('Deleted Successfully', 'success');
                }
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to delete', 'error');
            });
    };

    /**
     * Update a comment for a specific blog and update both the state and cache.
     *
     * @param {string} blogId - The ID of the blog for which to update a comment.
     * @param {Object} data - The updated data for the comment.
     * @param {string} id - The ID of the comment to update.
     * @returns {void}
     */
    const handleUpdate = (blogId, id, data,) => {
        req({ method: 'PATCH', uri: `comment/${id}`, data })
            .then(({ data }) => {
                dispatch(updateComment(data));
                const updatedComments = comments.map(comment => (comment.id === id ? data : comment));
                updateCache(blogId, updatedComments);
                closeModal('updateComment');
                hitToast('Updated Successfully', 'success');
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to update', 'error');
            });
    };

    return {
        getblogsComments,
        handleCreate,
        handleDelete,
        handleUpdate,
    };
}
