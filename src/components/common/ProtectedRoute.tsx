import { FunctionComponent, ReactElement } from 'react'

import { Navigate } from 'react-router'

import { useAuthStore } from '../../store/authStore.ts'

interface ProtectedRouteProps {
  page: ReactElement
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ page }) => {
  const { token } = useAuthStore()

  return token ? page : <Navigate to="/login" />
}

export default ProtectedRoute
