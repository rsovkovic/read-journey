'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/app/api/books';

import Link from 'next/link';
import BookCard from '../BookCard/BookCard';

export default function RecommendedPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['recommended', 1, 3],
    queryFn: () => fetchBooks({ page: 1, limit: 3 }),
  });

  const books = data?.results || [];

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-(--input-bg) p-5">
      <h3 className="text-foreground text-lg font-bold">Recommended books</h3>

      {isLoading ? (
        <p className="text-sm text-(--text-secondary)">Loading...</p>
      ) : (
        <div className="flex justify-evenly gap-1.5 sm:gap-5">
          {books.map((book, idx) => (
            <BookCard key={book._id} book={book} index={idx} isSmall={true} />
          ))}
        </div>
      )}
      <Link
        href="/recommended"
        className="group mt-5 flex items-center justify-between pt-4 transition-colors"
      >
        <span className="group-hover:text-foreground text-sm text-(--text-secondary) underline transition-colors">
          Home
        </span>
        <svg className="h-6 w-6 transition-transform group-hover:translate-x-1">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
      </Link>
    </div>
  );
}
