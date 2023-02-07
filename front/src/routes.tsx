import { Routes, Route, Navigate } from 'react-router-dom'

import { MainPage } from './pages/MainPage/MainPage'
import { ItemPage } from './pages/ItemPage/ItemPage'
import { AboutPage } from './pages/AboutPage/AboutPage'

export const ROUTES = {
  main: '/',
  item: '/places',
  about: '/about',
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.main} element={<MainPage />} />
      <Route path={ROUTES.about} element={<AboutPage />} />
      <Route path={ROUTES.item + '/:pk'} element={<ItemPage />} />
      <Route path="*" element={<Navigate replace to={ROUTES.main} />} />
    </Routes>
  )
}
