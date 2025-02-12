import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
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
