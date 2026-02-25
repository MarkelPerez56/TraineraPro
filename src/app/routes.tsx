import { createBrowserRouter, Navigate } from 'react-router';
import { AuthPage } from './components/AuthPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './components/DashboardHome';
import { ProfilePage } from './components/ProfilePage';
import { RowersPage } from './components/RowersPage';
import { RowerDetailPage } from './components/RowerDetailPage';
import { WeighInsPage } from './components/WeighInsPage';
import { LineupsPage } from './components/LineupsPage';
import { TestPage } from './components/TestPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'rowers', element: <RowersPage /> },
      { path: 'rowers/:id', element: <RowerDetailPage /> },
      { path: 'weigh-ins', element: <WeighInsPage /> },
      { path: 'lineups', element: <LineupsPage /> },
      { path: 'tests', element: <TestPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);