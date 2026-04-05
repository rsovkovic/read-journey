import { BooksResponse, ResultBook } from '@/app/api/books';
import Image from 'next/image';

interface Props {
  book: ResultBook | BooksResponse;
  index: number;
  onClick?: () => void;
  onDelete?: (id: string) => void;
  className?: string;
  isSmall?: boolean;
  isLibrary?: boolean;
  onOpenModal?: () => void;
}

export default function BookCard({
  book,
  index,
  onDelete,
  className = '',
  isSmall = false,
  isLibrary = false,
  onOpenModal,
}: Props) {
  return (
    <div
      onClick={onOpenModal}
      className={`group cursor-pointer transition-all ${isSmall ? 'w-17.75' : 'w-full'} ${className}`}
    >
      <div className="relative mb-2 aspect-137/208 w-full overflow-hidden rounded-lg">
        <Image
          src={book.imageUrl || '/image/image_no.png'}
          alt={book.title}
          fill
          priority={index < 10}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-1">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2
            className={`text-foreground truncate font-bold ${isSmall ? 'text-[10px]' : 'text-sm'}`}
          >
            {book.title}
          </h2>
          <p
            className={`truncate font-medium text-[#686868] ${isSmall ? 'text-[8px]' : 'text-[0.625rem]'}`}
          >
            {book.author}
          </p>
        </div>

        {isLibrary && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(book._id);
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(232,80,80,0.2)] bg-[rgba(232,80,80,0.1)] text-[#E85050] transition-colors hover:bg-[#E85050] hover:text-white"
          >
            <svg className="h-4 w-4">
              <use href="/sprite.svg#icon-trash" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
