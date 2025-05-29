import { Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './components/common/ProtectedRoute.tsx'
import { TodoApp } from './components/todo/TodoApp.tsx'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute page={<Dashboard />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  )
}
