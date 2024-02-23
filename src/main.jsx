import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './pages/Dashboard'
import { Layout } from './components/Layout';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
