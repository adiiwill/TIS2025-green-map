import { Route, Routes } from 'react-router'

import ProtectedRoute from './components/common/ProtectedRoute.tsx'
import TodoApp from './components/todo/TodoApp.tsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute page={<Dashboard />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  )
}

export default Router
