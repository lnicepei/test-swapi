import { CharacterDetailsPage } from '@/pages/character-details';
import { CharactersPage } from '@/pages/characters';
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

const getCharacters = async (page: string | null, search: string | null) => {
  const response = await fetch(
    `https://swapi.dev/api/people?page=${page ?? 1}&search=${search ?? ''}`,
  );
  const data: PaginatedResponse<Character> = await response.json();

  return {
    results: data.results,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
};

const getCharacter = async (id: string | undefined) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  const data: Character = await response.json();
  return data;
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
            loader: async ({ request }) => {
              const page = new URL(request.url).searchParams.get('page');
              const search = new URL(request.url).searchParams.get('search');
              const characters = await getCharacters(page, search);
              return characters;
            },
          },
          {
            path: 'characters/:id',
            element: <CharacterDetailsPage />,
            loader: async ({ params }) => {
              const character = await getCharacter(params.id);
              return character;
            },
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
