import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
