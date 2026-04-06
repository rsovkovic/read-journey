'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BooksResponse, BookStatus, getOwnBooks } from '@/app/api/books';
import BookCard from '@/components/BookCard/BookCard';
import Image from 'next/image';
import CustomDropdown from '@/components/Ui/CustomDropdown';

interface Props {
  onDeleteBook: (id: string) => void;
  onBookClick: (book: BooksResponse) => void;
}

const filterOptions: { label: string; value: BookStatus | undefined }[] = [
  { label: 'All books', value: undefined },
  { label: 'Unread', value: 'unread' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

export default function MyLibraryBooks({ onDeleteBook, onBookClick }: Props) {
  const [status, setStatus] = useState<BookStatus | undefined>(undefined);

  const { data, isLoading } = useQuery<BooksResponse[]>({
    queryKey: ['user-books', status],
    queryFn: () => getOwnBooks(status),
  });

  const books = data || [];
  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">My Library</h1>

        <CustomDropdown<BookStatus | undefined>
          options={filterOptions}
          selectedValue={status}
          onChange={setStatus}
        />
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-5 flex h-25 w-25 items-center justify-center rounded-full bg-[#262626] md:h-32.5 md:w-32.5">
            <div className="relative h-12.5 w-12.5 md:h-17.5 md:w-17.5">
              <Image
                src="/image/books_desktop.png"
                alt="Empty library"
                fill
                sizes="(max-width: 768px) 50px, 70px"
                className="object-contain"
              />
            </div>
          </div>
          <p className="max-w-50 text-sm leading-5 md:max-w-70 lg:max-w-none">
            To start training, add{' '}
            <span className="text-white/50">some of your books</span>{' '}
            <span className="lg:block">or from the recommended ones.</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 xl:grid-cols-5">
          {books.map((book, index) => (
            <BookCard
              key={book._id}
              book={book}
              index={index}
              isLibrary={true}
              onDelete={() => onDeleteBook(book._id)}
              onOpenModal={() => onBookClick(book)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
