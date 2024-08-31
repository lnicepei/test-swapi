import { useDebounce } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Loader } from '@/shared/ui/Loader';
import { PaginationUI } from '@/shared/ui/Pagination/index';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCharacters } from './useCharacters';

export function CharactersPage() {
  const { data, isLoading, hasNextPage } = useCharacters();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get('search') ?? '',
  );
  const debouncedSearchTerm = useDebounce(searchTerm);

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchParams({
      search: debouncedSearchTerm,
      page: searchParams.get('page') ?? '1',
    });
  }, [debouncedSearchTerm]);

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
      {isLoading && <Loader />}
      {!data && <div>No data</div>}
      <div className="overflow-x-auto mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-32">Name</TableHead>
              <TableHead className="max-w-20">Height</TableHead>
              <TableHead className="max-w-20">Mass</TableHead>
              <TableHead className="max-w-24">Gender</TableHead>
              <TableHead className="max-w-32">Created</TableHead>
              <TableHead className="max-w-32">Edited</TableHead>
              <TableHead className="max-w-24">URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results.map((character) => (
              <TableRow key={character.url}>
                <TableCell className="max-w-32">{character.name}</TableCell>
                <TableCell className="max-w-20">{character.height}</TableCell>
                <TableCell className="max-w-20">{character.mass}</TableCell>
                <TableCell className="max-w-24">{character.gender}</TableCell>
                <TableCell className="max-w-32">
                  {new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(character.created))}
                </TableCell>
                <TableCell className="max-w-32">
                  {new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(character.edited))}
                </TableCell>
                <TableCell className="max-w-24 ">
                  <Link
                    to={`/characters/${character.url.split('/').at(-2)}?fromPage=${searchParams.get('page')}&fromSearch=${searchParams.get('search')}`}
                    className="w-full"
                  >
                    <Button className="w-full">Visit page</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationUI hasNextPage={hasNextPage} />
    </>
  );
}
