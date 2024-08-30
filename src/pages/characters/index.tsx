import { Character, PaginatedResponse } from '@/app/providers/RouterProvider';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PaginationUI } from '@/shared/ui/Pagination/index';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';

export function CharactersPage() {
  const { results } = useLoaderData() as PaginatedResponse<Character>;
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ page: '1', search: e.target.value });
  };

  const searchTerm = searchParams.get('search') ?? '';

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
      <Input
        type="text"
        placeholder="Search characters..."
        onChange={(e) => {
          onSearchTermChange(e);
        }}
        value={searchTerm}
        className="mb-4"
      />
      <div className="overflow-x-auto mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Mass</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Starships</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Edited</TableHead>
              <TableHead>URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((character) => (
              <TableRow key={character.url}>
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.height}</TableCell>
                <TableCell>{character.mass}</TableCell>
                <TableCell>{character.gender}</TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>{character.vehicles}</TableCell>
                <TableCell>{character.starships}</TableCell>
                <TableCell>{character.created}</TableCell>
                <TableCell>{character.edited}</TableCell>
                <TableCell>
                  <Link to={`/characters/${character.url.split('/').at(-2)}`}>
                    <Button>Visit page</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationUI />
    </>
  );
}
