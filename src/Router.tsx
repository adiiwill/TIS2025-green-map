import { Route, Routes } from 'react-router'

import ProtectedRoute from './components/common/ProtectedRoute.tsx'
import Layout from './components/layout/Layout.tsx'
import TodoApp from './components/todo/TodoApp.tsx'
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

      <Route
        path="/"
        element={
          <ProtectedRoute
            page={<Layout children={<Dashboard />} extended={false} title="Dashboard" />}
          />
        }
      />
      <Route
        path="/administration"
        element={
          <ProtectedRoute
            page={<Layout children={<Admin />} extended={true} title="Administration" />}
          />
        }
      />
      <Route
        path="/map"
        element={
          <ProtectedRoute page={<Layout children={<Map />} extended={false} title="Map" />} />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute
            page={<Layout children={<Profile />} extended={false} title="Profile" />}
          />
        }
      />
    </Routes>
  )
}

export default Router
