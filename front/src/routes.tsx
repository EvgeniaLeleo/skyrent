import { Routes, Route, Navigate } from 'react-router-dom'

import { MainPage } from './pages/MainPage/MainPage'
import { ItemPage } from './pages/ItemPage/ItemPage'

export const ROUTES = {
  main: '/',
  item: '/places',
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.main} element={<MainPage />} />
      <Route path={ROUTES.item + '/:pk'} element={<ItemPage />} />
      <Route path="*" element={<Navigate replace to={ROUTES.main} />} />
    </Routes>
  )
}
