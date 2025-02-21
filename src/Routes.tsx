import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from 'components/Layout.tsx';
import Home from 'pages/Home';
import Result from 'pages/Result.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'result',
        element: <Result />,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
