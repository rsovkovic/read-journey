import { BooksResponse } from '@/app/api/books';
import Image from 'next/image';

interface BookDetailsProps {
  book: BooksResponse;
  actionButton: React.ReactNode;
}

export default function BookDetails({ book, actionButton }: BookDetailsProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-2 aspect-10/16 w-36 overflow-hidden rounded-lg shadow-xl md:w-38">
        <Image
          src={book.imageUrl || '/image/image_no.png'}
          alt={book.title}
          fill
          priority
          sizes="(min-width: 768px) 152px, 144px"
        />
      </div>
      <h3 className="text-foreground mt-2 text-lg font-bold text-balance">
        {book.title}
      </h3>
      <p className="mb-2 text-sm text-[#686868]">{book.author}</p>
      <p className="text-foreground mb-8 text-xs">{book.totalPages} pages</p>
      {actionButton}
    </div>
  );
}
