import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage'
import AdminOffersPage from '../pages/admin/AdminOffersPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
          <Route path="admin/products" element={<AdminProductsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin/categories" element={<AdminCategoriesPage />} />
          <Route path="admin/offers" element={<AdminOffersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
