import { queryClient } from '@/app/providers/QueryProvider';
import { Character, PaginatedResponse } from '@/app/providers/RouterProvider';
import { SWApi } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// const getCharacters = async (page: string | null, search: string | null) => {
//   const response = await fetch(
//     `https://swapi.dev/api/people?page=${page ?? 1}&search=${search ?? ''}`,
//   );
//   const data: PaginatedResponse<Character> = await response.json();

//   return {
//     results: data.results,
//     count: data.count,
//     next: data.next,
//     previous: data.previous,
//   };
// };

export const getCharactersListQueryKey = (page: string, search: string) => [
  'characters',
  'list',
  page,
  search,
];

const charactersListQuery = (page: string, search: string) => ({
  queryKey: getCharactersListQueryKey(page, search),
  queryFn: async () => SWApi.getCharacters(page, search),
  cacheTime: 6000,
  staleTime: 6000,
});

export const charactersListLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const params = new URL(request.url).searchParams;

  const characters = await queryClient.fetchQuery(
    charactersListQuery(params.get('page') ?? '1', params.get('search') ?? ''),
  );

  return characters;
};

export const useCharacters = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const { data, isLoading } = useQuery<PaginatedResponse<Character>>(
    charactersListQuery(page ?? '1', search ?? ''),
  );

  const hasNextPage = data?.next !== null;

  return { data, isLoading, hasNextPage };
};
