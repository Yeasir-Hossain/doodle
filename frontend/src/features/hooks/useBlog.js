import { useEffect } from "react";
import req from "../../utils/req";
import { createBlog, deleteBlog, setValue, updateBlog } from "../redux/reducers/blogReducer";
import { useDispatch } from 'react-redux';
import hitToast from "../../utils/hitToast";
import { useGlobalCtx } from "../context/providers/Global/GlobalProvider";
import { useNavigate } from "react-router-dom";

export default function useBlog() {
    const dispatch = useDispatch();
    const { closeModal } = useGlobalCtx();
    const navigate = useNavigate();

    const getBlogs = () => {
        dispatch(setValue({ target: 'loading', value: true }));
        const abrtCtrl = new AbortController();
        req({ uri: `blog`, signal: abrtCtrl.signal })
            .then(({ data }) => {
                dispatch(setValue({ target: 'blogs', value: data }));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(setValue({ target: 'loading', value: false }));
                abrtCtrl.abort();
            });
    }

    const handleCreate = (data) => {
        req({ method: 'POST', uri: `blog`, data })
            .then(({ data }) => {
                if (data.id) {
                    dispatch(createBlog(data))
                    navigate("/");
                    hitToast('Uploaded Successfully', 'success');
                }
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to upload', 'error');
            })

    };

    const getSingleBlog = (id) => {
        const abrtCtrl = new AbortController();
        req({ uri: `blog/${id}`, signal: abrtCtrl.signal })
            .then(({ data }) => {
                dispatch(setValue({ target: 'singleBlog', value: data }));
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to upload', 'error');
            })
            .finally(() => abrtCtrl.abort());
    };

    const handleDelete = (id) => {
        req({ method: 'DELETE', uri: `blog/${id}` })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(deleteBlog(id));
                    closeModal('deleteBlog');
                    hitToast('Deleted Successfully', 'success');
                }
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to delete', 'error');
            });
    };

    const handleUpdate = (id, data) => {
        req({ method: 'PATCH', uri: `blog/${id}`, data })
            .then(({ data }) => {
                dispatch(updateBlog(data));
                hitToast('Updated Successfully', 'success');
            })
            .catch((err) => {
                console.log(err);
                hitToast('Failed to update', 'error');
            });
    };

    return {
        getBlogs,
        handleCreate,
        getSingleBlog,
        handleDelete,
        handleUpdate
    }
}
