import { Route, Routes } from 'react-router'

import ProtectedRoute from './components/common/ProtectedRoute'
import TodoApp from './components/todo/TodoApp'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Map from './pages/Map'
import Profile from './pages/Profile'
import Registration from './pages/Registration'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route path="/todo" element={<TodoApp />} />

      <Route path="/" element={<ProtectedRoute page={<Dashboard />} />} />
      <Route path="/administration" element={<ProtectedRoute page={<Admin />} />} />
      <Route path="/map" element={<ProtectedRoute page={<Map />} />} />
      <Route path="/profile" element={<ProtectedRoute page={<Profile />} />} />
    </Routes>
  )
}

export default Router
