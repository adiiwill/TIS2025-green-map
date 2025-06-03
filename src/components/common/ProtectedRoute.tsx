import { FunctionComponent, ReactElement } from 'react'
import { useAuthStore } from '../../store/authStore.ts'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
  page: ReactElement
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ page }) => {
  const { token } = useAuthStore()

  return token ? page : <Navigate to="/login" />
}

export default ProtectedRoute
