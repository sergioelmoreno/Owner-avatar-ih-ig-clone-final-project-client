import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {

  const { loggedUser, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!loggedUser) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default PrivateRoutes