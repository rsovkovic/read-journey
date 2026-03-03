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
          // className="object-contain"
          sizes="(min-width: 768px) 152px, 144px"
        />
      </div>
      {/* <Image
        src={book.imageUrl || '/image_no.png'}
        alt={book.title}
        width={20}
        height={20}
        className="mb-4 h-53.25 w-35 rounded-lg object-cover"
      /> */}
      {/* <div className="flex min-w-0 flex-col"> */}
      {/* <h3 className="text-foreground my-2 line-clamp-3 text-lg leading-tight font-bold"> */}
      <h3 className="text-foreground mt-2 text-lg font-bold text-balance">
        {/* <h3 className="text-foreground mb-2 text-lg font-bold wrap-break-word"> */}
        {book.title}
      </h3>
      <p className="mb-2 text-sm text-[#686868]">{book.author}</p>
      <p className="text-foreground mb-8 text-xs">{book.totalPages} pages</p>
      {/* </div> */}
      {/* Сюди ми передамо кнопку: або "Add", або "Start reading" */}
      {actionButton}
    </div>
  );
}
