import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../authContext/AuthProvider'

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <div className="p-8">Loading...</div>

  const isAdminRoute = location.pathname.startsWith('/admin')
  const storedUser = isAdminRoute
    ? (() => { try { return JSON.parse(localStorage.getItem('admin_user')) } catch { return null } })()
    : user

  if (!storedUser) {
    const redirectTo = isAdminRoute ? '/admin/login' : '/login'
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }
  return children
}

export default RequireAuth
