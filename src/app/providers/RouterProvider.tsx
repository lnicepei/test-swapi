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

export type PaginatedResponse<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
};

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

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
