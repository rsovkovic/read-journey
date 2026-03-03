// export default function MyReading() {
//   return (
//     <div className="flex items-center justify-between p-5">
//       <h2 className="text-xl font-bold sm:text-3xl">My reading</h2>
//     </div>
//   );
// }

// components/Reading/MyReadingBook.tsx
import Image from 'next/image';
import { BooksResponse } from '@/app/api/books';

interface Props {
  book: BooksResponse;
}

export default function MyReadingBook({ book }: Props) {
  return (
    <>
      <div className="flex items-center justify-between p-10">
        <h2 className="text-xl font-bold sm:text-3xl">My reading</h2>
      </div>
      <div className="flex flex-col items-center">
        {/* Великий контейнер для обкладинки */}
        <div className="relative mb-4 h-64 w-40 overflow-hidden rounded-lg shadow-2xl md:h-85 md:w-56">
          <Image
            src={book.imageUrl || '/image/image_no.png'}
            alt={book.title}
            fill
            priority
            // className="object-cover"
          />
        </div>

        {/* Текстова частина по центру */}
        <div className="text-center">
          <h2 className="text-foreground mb-1 line-clamp-1 text-lg font-bold md:text-xl">
            {book.title}
          </h2>
          <p className="text-sm font-medium text-[#686868] md:text-base">
            {book.author}
          </p>
        </div>

        {/* Індикатор прогресу (червона кнопка-лампочка з пульсацією) */}
        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E85050] bg-[#E85050]/10">
          <div className="h-4 w-4 animate-pulse rounded-full bg-[#E85050] shadow-[0_0_10px_#E85050]" />
        </div>
      </div>
    </>
  );
}
