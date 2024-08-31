import { useSearchParams } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination';

export function PaginationUI({
  hasNextPage = true,
}: {
  hasNextPage?: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);

  const onNextPage = () => {
    setSearchParams({
      page: (currentPage + 1).toString(),
      search: searchParams.get('search') ?? '',
    });
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({
        page: (currentPage - 1).toString(),
        search: searchParams.get('search') ?? '',
      });
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            onClick={onPreviousPage}
            className={
              currentPage <= 1
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink size="sm" onClick={onPreviousPage}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            size="sm"
            onClick={hasNextPage ? onNextPage : () => {}}
            className={
              !hasNextPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
