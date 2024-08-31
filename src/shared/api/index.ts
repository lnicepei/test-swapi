import { Character, PaginatedResponse } from '@/app/providers/RouterProvider';

export class SWApi {
  static async getCharacters(page: string | null, search: string | null) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/people?page=${page ?? 1}&search=${search ?? ''}`,
    );
    const data: PaginatedResponse<Character> = await response.json();

    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  }

  static async getCharacter(id: string) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/people/${id}`,
    );

    return await response.json();
  }
}
