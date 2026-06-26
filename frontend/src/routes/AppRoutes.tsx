import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
