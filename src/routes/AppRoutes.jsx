import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import CreatePostPage from '../pages/NewPostPage/NewPostPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostsPage from '../pages/PostsPage/PostsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PrivateRoutes from './PrivateRoutes'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PostDetailsPage from '../pages/PostDetailsPage/PostDetailsPage'
import EditPostPage from '../pages/EditPostPage/EditPostPage'

const AppRoutes = () => {

  return (
    <div className="AppRoutes">
      <Routes>
        <Route path={'/'} element={<PostsPage />} />
        <Route path={'/posts/new'} element={<CreatePostPage />} />
        <Route path={'/posts/post/:postId'} element={<PostDetailsPage />} />
        <Route path={'/posts/edit/:postId'} element={<EditPostPage />} />
        <Route path={'/signup'} element={<SignupPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'*'} element={<NotFoundPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path={'/profile'} element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes