// import { ResultBook } from '@/app/api/books';

// import Image from 'next/image';
// import Link from 'next/link';

// interface Props {
//   book: ResultBook;
// }

// export default function BookCard({ book }: Props) {
//   return (
//     <Link href={'/'}>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//         <div key={book._id} className="rounded-lg border p-4 shadow-sm">
//           <div className="relative mb-4 h-72 w-full">
//             <Image
//               src={book.imageUrl || 'https://placehold.co'}
//               alt={book.title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="rounded-lg object-cover"
//             />
//           </div>
//           <h2 className="font-bold">{book.title}</h2>
//           <p className="text-sm text-gray-500">{book.author}</p>
//           <div className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs">
//             {book.totalPages} pages.
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// import { ResultBook } from '@/app/api/books';
// import Image from 'next/image';

// interface Props {
//   book: ResultBook;
//   index: number;
//   onClick?: () => void; // Додаємо проп для кліку (відкриття модалки)
//   className?: string;
// }

// export default function BookCard({
//   book,
//   index,
//   onClick,
//   className = '',
// }: Props) {
//   return (
//     <div
//       onClick={onClick}
//       className={`group w-full cursor-pointer ${className}`} // Обмежуємо ширину згідно з макетом
//     >
//       {/* Контейнер для зображення */}
//       <div className="relative mb-2 aspect-137/208 w-full overflow-hidden rounded-lg">
//         <Image
//           src={book.imageUrl || '/default-book.png'} // Краще мати своє дефолтне фото в public
//           alt={book.title}
//           fill
//           // sizes="(max-width: 768px) 137px, 190px"
//           priority={index < 6}
//           className="transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       {/* Інформація про книгу */}
//       <div className="flex flex-col gap-0.5">
//         <h2 className="text-foreground truncate text-sm font-bold">
//           {book.title}
//         </h2>
//         <p className="truncate text-[0.625rem] font-medium text-(--text-secondary)">
//           {book.author}
//         </p>
//       </div>
//     </div>
//   );
// }

import { BooksResponse, ResultBook } from '@/app/api/books';
import Image from 'next/image';

interface Props {
  book: ResultBook | BooksResponse;
  index: number;
  onClick?: () => void;
  onDelete?: (id: string) => void;
  className?: string;
  isSmall?: boolean; // Додаємо цей проп
  isLibrary?: boolean;
  onOpenModal: () => void;
}

export default function BookCard({
  book,
  index,
  onDelete,
  className = '',
  isSmall = false, // По дефолту false
  isLibrary = false,
  onOpenModal,
}: Props) {
  return (
    <div
      onClick={onOpenModal}
      // Якщо isSmall — ширина 71px, якщо ні — 137px (або те, що прийде в className)
      className={`group cursor-pointer transition-all ${isSmall ? 'w-17.75' : 'w-full'} ${className}`}
    >
      {/* Контейнер для зображення — aspect ratio збереже пропорції автоматично */}
      <div className="relative mb-2 aspect-137/208 w-full overflow-hidden rounded-lg">
        <Image
          src={book.imageUrl || '/image/image_no.png'}
          alt={book.title}
          fill
          priority={index < 6}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Інформація про книгу */}
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
        {/* Кнопка видалення (показується тільки якщо isLibrary={true}) */}
        {isLibrary && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Щоб не спрацював onClick всієї картки
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
