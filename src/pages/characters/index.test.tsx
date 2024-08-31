import { Character, PaginatedResponse } from '@/app/providers/RouterProvider';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLoaderData } from 'react-router-dom';
import { CharactersPage } from './index';

// Mock the useLoaderData hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));

// Mock data
const mockCharacters: PaginatedResponse<Character> = {
  results: [
    {
      name: 'Luke Skywalker',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      height: '172',
      mass: '77',
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: ['https://swapi.dev/api/vehicles/1/'],
      starships: ['https://swapi.dev/api/starships/1/'],
    },
  ],
  count: 1,
};

describe('CharactersPage', () => {
  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue(mockCharacters);
  });

  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByPlaceholderText('Search characters...'),
    ).toBeInTheDocument();
  });

  it('renders the character table', () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('updates search params on input change', () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Search characters...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Darth Vader' } });
    expect(input.value).toBe('Darth Vader');
  });
});
