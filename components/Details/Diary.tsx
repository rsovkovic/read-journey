// 'use client';
// import { useState } from 'react';
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { BooksProgress } from '@/app/api/books';
// import { formatDate } from '@/utils/formatDate';
// import { RemoveReadingBook } from '@/app/api/books';

// interface Props {
//   progress: BooksProgress[];
//   totalPages: number;
//   bookId: string;
// }

// export default function Diary({ progress, totalPages, bookId }: Props) {
//   const queryClient = useQueryClient();

//   const { mutate: removeSession } = useMutation({
//     mutationFn: ({
//       bookId,
//       readingId,
//     }: {
//       bookId: string;
//       readingId: string;
//     }) => RemoveReadingBook(bookId, readingId),
//     onSuccess: () => {
//       // Це змусить React Query перекачати дані книги, і сесія зникне зі списку
//       queryClient.invalidateQueries({ queryKey: ['book'] });
//     },
//   });
//   return (
//     <ul className="flex flex-col">
//       {progress
//         .filter((session) => session.finishReading)
//         .slice()
//         .reverse()
//         .map((session, index) => {
//           const { dmy, hm } = formatDate(session.finishReading);
//           const pagesRead = session.finishPage - session.startPage;
//           const isLatest = index === 0;

//           return (
//             <li key={session._id} className="flex justify-between gap-x-4">
//               {/* ЛІВА ЧАСТИНА: Таймлайн + Дата */}
//               <div className="flex gap-x-2.5">
//                 <div className="flex flex-col items-center">
//                   {/* Крапка: зробив її чорною/білою залежно від теми */}
//                   <div
//                     className={`h-5 w-5 border-4 ${
//                       isLatest ? 'border-foreground' : 'border-[#686868]'
//                     }`}
//                   />

//                   <div className="bg-background w-0.5 grow" />
//                 </div>

//                 <div className="flex flex-col gap-y-1">
//                   <p
//                     className={`text-[16px] leading-none font-bold ${
//                       isLatest ? 'text-foreground' : 'text-[#686868]'
//                     }`}
//                   >
//                     {dmy}
//                   </p>
//                   <p className="text-[12px] text-[#686868]">{hm}</p>{' '}
//                 </div>
//               </div>

//               {/* ПРАВА ЧАСТИНА: Статистика */}
//               <div className="flex flex-col gap-y-2 pb-6">
//                 <p className="text-sm font-medium text-[#686868]">
//                   {pagesRead} pages
//                 </p>

//                 <div className="flex items-center gap-x-2">
//                   <svg className="h-6 w-12">
//                     <use href="/sprite.svg#icon-line-diagram" />
//                   </svg>

//                   <button
//                     // onClick={() => onDelete(session._id)}
//                     onClick={() =>
//                       removeSession({ bookId, readingId: session._id })
//                     }
//                     // className="hover:text-foreground text-[#686868] transition-opacity"
//                     className="text-[#686868] transition-colors hover:text-red-500"
//                   >
//                     <svg className="h-4 w-4">
//                       <use href="/sprite.svg#icon-trash" />
//                     </svg>
//                   </button>
//                 </div>

//                 <p className="text-[10px] text-[#686868]">
//                   {session.speed} pages
//                   <br />
//                   per hour
//                 </p>
//               </div>
//             </li>
//           );
//         })}
//     </ul>
//   );
// }
// ///////////////////////////////////////////////////////////////////////////////
// 'use client';

{
  /* <p className="text-[12px] text-secondary tabular-nums">
  {percent}%
</p> */
}
// якщо числа стрибають

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { BooksProgress } from '@/app/api/books';
import { formatDate } from '@/utils/formatDate';
import { RemoveReadingBook } from '@/app/api/books';

interface Props {
  progress: BooksProgress[];
  totalPages: number;
  bookId: string;
}

export default function Diary({ progress, totalPages, bookId }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeSession } = useMutation({
    mutationFn: ({
      bookId,
      readingId,
    }: {
      bookId: string;
      readingId: string;
    }) => RemoveReadingBook(bookId, readingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
    },
  });

  const handleDelete = (readingId: string) => {
    removeSession({ bookId, readingId });
  };

  const sessions = [...progress]
    .filter((session) => session.finishReading)
    .reverse();

  return (
    <ul className="flex flex-col">
      {sessions.map((session, index) => {
        const { dmy, hm } = formatDate(session.finishReading);
        const pagesRead = session.finishPage - session.startPage;
        const isLatest = index === 0;

        // 1. Розрахунок відсотків
        const percent = ((session.finishPage / totalPages) * 100).toFixed(2);

        // 2. Розрахунок хвилин
        const startDate = new Date(session.startReading);
        const finishDate = new Date(session.finishReading);
        const durationMs = finishDate.getTime() - startDate.getTime();
        const durationMinutes = Math.max(
          1,
          Math.round(durationMs / (1000 * 60)),
        ); // мінімум 1 хвилина

        return (
          <li key={session._id} className="flex justify-between gap-x-4">
            {/* Timeline + Date */}
            <div className="flex gap-x-2.5">
              <div className="flex flex-col items-center">
                <div
                  className={`h-5 w-5 border-4 ${
                    isLatest ? 'border-foreground' : 'border-[#686868]'
                  }`}
                />

                <div className="bg-background w-0.5 grow" />
              </div>

              <div className="flex flex-col gap-y-1">
                <p
                  className={`pb-8 text-[16px] leading-none font-bold ${
                    isLatest ? 'text-foreground' : 'text-[#686868]'
                  }`}
                >
                  {dmy}
                </p>

                <p className="text-foreground text-xl">{percent}%</p>
                {/* ХВИЛИНИ ТУТ */}
                <p className="text-[10px] text-[#686868]">
                  {durationMinutes} minutes
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-y-2 pb-6">
              <p className="text-sm font-medium text-[#686868]">
                {pagesRead} pages
              </p>

              <div className="flex items-center gap-x-2">
                <svg className="h-6 w-12">
                  <use href="/sprite.svg#icon-line-diagram" />
                </svg>

                <button
                  onClick={() => handleDelete(session._id)}
                  className="text-[#686868] transition-colors hover:text-red-500"
                >
                  <svg className="h-4 w-4">
                    <use href="/sprite.svg#icon-trash" />
                  </svg>
                </button>
              </div>

              <p className="text-[10px] text-[#686868]">
                {session.speed} pages
                <br />
                per hour
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

///////////////////////////////////////////////////////////////////////////////////
// export default function Diary({ progress, totalPages }: Props) {
//   return (
//     <div>
//       {progress
//         .slice()
//         .reverse()
//         .map((session) => {
//           const { dmy, hm } = formatDate(session.finishReading);
//           const pagesRead = session.finishPage - session.startPage;

//           return (
//             <div key={session._id} className="flex justify-between">
//               {/* Таймлайн (вертикальна лінія) */}
//               <div className="flex gap-2">
//                 <div className="flex flex-col items-center">
//                   <div className="h-4 w-4 border" /> {/* Крапка */}
//                   <div className="bg-background h-full w-0.5" />
//                   {/* Лінія */}
//                 </div>
//                 <div>
//                   <p className="text-[16px] font-bold">{dmy}</p>
//                 </div>
//               </div>
//               {/* Дані сесії */}

//               <div className="flex items-start justify-between">
//                 <div className="flex flex-col gap-2 pb-2.5">
//                   <p className="text-[10px] text-(--text-secondary)">
//                     {pagesRead} pages
//                   </p>
//                   <div className="flex items-center gap-x-1.5">
//                     <svg name="pie-chart" className="h-6 w-15">
//                       <use href="/sprite.svg#icon-line-diagram" />
//                     </svg>
//                     {/* Тут буде кнопка видалення (кошик) */}
//                     <svg className="h-3.5 w-3.5">
//                       <use href="/sprite.svg#icon-trash" />
//                     </svg>
//                   </div>
//                   <p className="text-[10px] text-(--text-secondary)">
//                     {session.speed} pages <br /> per hour
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
