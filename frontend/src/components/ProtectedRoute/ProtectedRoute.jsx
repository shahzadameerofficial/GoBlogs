/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"


function ProtectedRoute({isAuth, children}) {
  if (isAuth) {
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default ProtectedRoute