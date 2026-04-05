'use client';

import BookCard from '../BookCard/BookCard';
import { PageLoader } from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { BooksResponse, RecommendBooksResponse } from '@/app/api/books';

interface BooksListProps {
  data: RecommendBooksResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (nextPage: number) => void;
  onBookClick: (book: BooksResponse) => void;
}

export default function BooksRecommended({
  data,
  isLoading,
  isError,
  page,
  onPageChange,
  onBookClick,
}: BooksListProps) {
  if (isLoading && !data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="p-10 pb-5">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold sm:text-3xl">Recommended</h2>

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            total={data.totalPages}
            onChange={onPageChange}
            isLoading={isLoading}
          />
        )}
      </div>

      {isError ? (
        <p className="text-(--error-red)">Error loading books</p>
      ) : data?.results.length === 0 ? (
        <div className="flex flex-col items-center py-20">
          <p className="text-foreground text-lg">
            No books found for your request
          </p>
          <p className="text-(--text-secondary)">Try changing the filters</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {data?.results.map((book, index) => (
            <li key={book._id}>
              <BookCard
                book={book}
                index={index}
                onOpenModal={() => onBookClick(book)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
