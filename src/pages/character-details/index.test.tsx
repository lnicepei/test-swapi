import { Character } from '@/app/providers/RouterProvider';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CharacterDetailsPage } from './index';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  species: ['Human'],
  gender: 'Male',
  homeworld: 'Tatooine',
  vehicles: ['X-wing', 'Landspeeder'],
  height: '172',
  mass: '77',
  hair_color: 'Blond',
  skin_color: 'Fair',
  eye_color: 'Blue',
  birth_year: '19BBY',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
  films: ['A New Hope'],
  starships: ['X-wing'],
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => mockCharacter,
  useNavigate: () => jest.fn(),
}));

describe('CharacterDetailsPage', () => {
  it('renders character details', () => {
    render(
      <MemoryRouter initialEntries={['/character-details']}>
        <Routes>
          <Route path="/character-details" element={<CharacterDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Name')).toHaveValue(mockCharacter.name);
    expect(screen.getByPlaceholderText('Species')).toHaveValue(
      mockCharacter.species.join(','),
    );
    expect(screen.getByPlaceholderText('Gender')).toHaveValue(
      mockCharacter.gender,
    );
    expect(screen.getByPlaceholderText('Origin')).toHaveValue(
      mockCharacter.homeworld,
    );
    expect(screen.getByPlaceholderText('Vehicles')).toHaveValue(
      mockCharacter.vehicles.join(','),
    );
  });
});
