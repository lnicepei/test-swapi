import { queryClient } from '@/app/providers/QueryProvider';
import { SWApi } from '@/shared/api';
import { MINUTE } from '@/shared/lib/constants';
import { Character, PaginatedResponse } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const getCharactersListQueryKey = (page: string, search: string) => [
  'characters',
  'list',
  page,
  search,
];

const charactersListQuery = (page: string, search: string) => ({
  queryKey: getCharactersListQueryKey(page, search),
  queryFn: async () => SWApi.getCharacters(page, search),
  cacheTime: MINUTE * 10,
  staleTime: MINUTE * 10,
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
