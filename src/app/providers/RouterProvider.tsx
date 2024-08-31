import { CharacterDetailsPage } from '@/pages/character-details';
import { loader } from '@/pages/character-details/useCharacter';
import { CharactersPage } from '@/pages/characters';
import { charactersListLoader } from '@/pages/characters/useCharacters';
import { Layout } from '@/pages/layout';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider as ReactRouterProvider,
  redirect,
  useRouteError,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'characters',
            element: <CharactersPage />,
            loader: charactersListLoader,
          },
          {
            path: 'characters/:id',
            element: <CharacterDetailsPage />,
            loader: loader,
          },
          {
            path: '/',
            loader: async () => redirect('/characters'),
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            path: '404',
            element: <h1>404</h1>,
          },
        ],
      },
      {
        loader: async () => redirect('/404'),
        path: '*',
      },
    ],
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

function BubbleError() {
  const error = useRouteError();

  if (error) throw error;

  return null;
}
