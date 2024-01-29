import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';

// Lazy-loaded components
const Blog = lazy(() => import('../../pages/blog/Blog'));
const BlogDetails = lazy(() => import('../../pages/blog/BlogDetails'));
const AddBlog = lazy(() => import('../../pages/blog/AddBlog'));
const UpdateBlog = lazy(() => import('../../pages/blog/UpdateBlog'));
const Favorites = lazy(() => import('../../pages/blog/Favorites'));
const Notfound = lazy(() => import('../../pages/notfound/Notfound'));


export default function Routing() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path='/' element={<Blog />} />
                <Route path='/add' element={<AddBlog />} />
                <Route path='/update/:id' element={<UpdateBlog />} />
                <Route path='/blog/:id' element={<BlogDetails />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='*' element={<Notfound />} />
            </Routes>
        </Suspense>
    );
}
