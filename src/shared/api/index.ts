import { Character, PaginatedResponse } from '@/shared/types';

export class SWApi {
  static async getCharacters(page: string | null, search: string | null) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/people?page=${page ?? 1}&search=${search ?? ''}`,
    );
    const data: PaginatedResponse<Character> = await response.json();

    return data;
  }

  static async getCharacter(id: string) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/people/${id}`,
    );

    const data: Character = await response.json();

    return data;
  }
}
