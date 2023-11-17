import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './routes/home';
import Layout from './layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
        ],
      },
])

const App = () => 
      <RouterProvider router={router} />;
  
  
  const container = document.getElementById('app')!;
  ReactDOM.createRoot(container).render(<App />);