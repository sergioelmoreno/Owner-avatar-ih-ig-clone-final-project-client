import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import CreatePostPage from '../pages/CreatePostPage/CreatePostPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostsPage from '../pages/PostsPage/PostsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PrivateRoutes from './PrivateRoutes'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

const AppRoutes = () => {

  return (
    <div className="AppRoutes">
      <Routes>
        <Route path={'/'} element={<PostsPage />} />
        <Route path={'/create-post'} element={<CreatePostPage />} />
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