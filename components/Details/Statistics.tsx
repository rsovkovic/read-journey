// import { BooksProgress } from '@/app/api/books';

// interface Props {
//   progress: BooksProgress[];
//   totalPages: number;
// }

// export default function Statistics({ progress, totalPages }: Props) {
//   // 1. Рахуємо суму всіх прочитаних сторінок за всі сесії
//   const totalReadPages = progress.reduce((sum, session) => {
//     // Враховуємо тільки завершені сесії, як ми робили в Diary
//     if (!session.finishReading) return sum;
//     return sum + (session.finishPage - session.startPage);
//   }, 0);

//   // 2. Рахуємо загальний відсоток (на основі того, що вже прочитано)
//   // Важливо: ми ділимо суму прочитаного на загальну кількість сторінок у книзі
//   const totalPercentage = Number(
//     ((totalReadPages / totalPages) * 100).toFixed(2),
//   );

//   return (
//     <div>
//       {/* Тут буде наш графік, який використовує totalPercentage */}
//       <div className="progress-circle-wrapper">
//         {/* Компонент для графіка */}
//       </div>

//       {/* Текст під колом */}
//       <div className="flex gap-x-2">
//         <div className="h-3.5 w-3.5 rounded-sm bg-green-500" />

//         <div className="flex flex-col gap-y-2">
//           <p className="text-foreground text-xl">{totalPercentage}%</p>
//           <p className="text-[12px] font-medium text-[#686868]">
//             {totalReadPages} pages read
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /////////////////////////////////////////////////////////////////

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BooksProgress } from '@/app/api/books';

interface Props {
  progress: BooksProgress[];
  totalPages: number;
}

export default function Statistics({ progress, totalPages }: Props) {
  const totalReadPages = progress.reduce((sum, session) => {
    if (!session.finishReading) return sum;
    return sum + (session.finishPage - session.startPage);
  }, 0);

  const totalPercentage = Number(
    ((totalReadPages / totalPages) * 100).toFixed(2),
  );

  return (
    <div className="flex flex-col items-center gap-y-5">
      {/* Контейнер для графіка */}
      <div className="h-29 w-29 sm:h-34.5 sm:w-34.5 xl:h-47 xl:w-47">
        <CircularProgressbar
          value={totalPercentage}
          // Текст всередині кола (якщо потрібно)
          text="100%"
          strokeWidth={15}
          styles={buildStyles({
            // Колір заповненої частини (Зелений)
            pathColor: 'var(--accent-green)',
            // Колір порожньої частини (Дуже темний зелений/чорний)
            trailColor: 'var(--background)',
            // Стиль тексту всередині
            textColor: 'var(--text-primary)',
            textSize: '20px',
            strokeLinecap: 'round', // Закруглені краї лінії
          })}
        />
      </div>

      {/* Інформація під колом */}
      <div className="flex items-baseline gap-x-2">
        <div className="h-3.5 w-3.5 rounded-sm bg-(--accent-green)" />

        <div className="flex flex-col gap-y-2">
          <p className="text-foreground text-xl leading-none">
            {totalPercentage}%
          </p>
          <p className="text-[12px] font-medium text-[#686868]">
            {totalReadPages} pages read
          </p>
        </div>
      </div>
    </div>
  );
}
