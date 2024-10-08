import { queryClient } from '@/app/providers/QueryProvider';
import { SWApi } from '@/shared/api';
import { MINUTE } from '@/shared/lib/constants';
import { Character, PaginatedResponse } from '@/shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const getQueryKey = (id: string) => ['character', 'detail', id];

const characterDetailQuery = (id: string) => ({
  queryKey: getQueryKey(id),
  queryFn: async () => SWApi.getCharacter(id),
  cacheTime: MINUTE * 10,
  staleTime: MINUTE * 10,
});

export const loader = async ({ params }: { params: any }) => {
  const character = await queryClient.fetchQuery(
    characterDetailQuery(params.id),
  );

  return character;
};

export const useUpdateCharacter = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  return useMutation({
    mutationFn: async ({ data, id }: { data: Character; id: string }) => {
      return await Promise.resolve({ data, id });
    },
    onSuccess: async ({
      data,
      id,
    }: {
      data: Character;
      id: string;
    }): Promise<void> => {
      // Mutating the character details page
      queryClient.setQueryData(getQueryKey(id), {
        ...queryClient.getQueryData(getQueryKey(id)),
        ...data,
      });

      // Mutating the characters list page
      queryClient.setQueryData(
        [
          'characters',
          'list',
          searchParams.get('fromPage'),
          searchParams.get('fromSearch'),
        ],
        (oldData: PaginatedResponse<Character>) => {
          return oldData
            ? {
                ...oldData,
                results: oldData.results.map((character: Character) =>
                  character.url.split('/').at(-2) === id ? data : character,
                ),
              }
            : oldData;
        },
      );
    },
  });
};

export function useCharacter(id: string) {
  const { data, isLoading } = useQuery(characterDetailQuery(id));

  return { data, isLoading };
}
