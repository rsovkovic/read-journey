import { formatDate } from '@/utils/formatDate';
import { BooksProgress } from '@/app/api/books';

interface ItemProps {
  session: BooksProgress;
  totalPages: number;
  isLatest: boolean;
  onDelete: (id: string) => void;
}

export default function DiaryItem({
  session,
  totalPages,
  isLatest,
  onDelete,
}: ItemProps) {
  const { dmy } = formatDate(session.finishReading);
  const pagesRead = session.finishPage - session.startPage;
  const percent = ((session.finishPage / totalPages) * 100).toFixed(2);

  const durationMs =
    new Date(session.finishReading).getTime() -
    new Date(session.startReading).getTime();
  const durationMinutes = Math.max(1, Math.round(durationMs / (1000 * 60)));

  return (
    <li className="flex justify-between gap-x-4">
      <div className="flex gap-x-2.5">
        <div className="flex flex-col items-center">
          <div
            className={`h-5 w-5 border-4 ${isLatest ? 'border-foreground' : 'border-[#686868]'}`}
          />
          <div className="bg-background w-0.5 grow" />
        </div>
        <div className="flex flex-col gap-y-1">
          <p
            className={`pb-8 text-[16px] leading-none font-bold ${isLatest ? 'text-foreground' : 'text-[#686868]'}`}
          >
            {dmy}
          </p>
          <p className="text-foreground text-xl">{percent}%</p>
          <p className="text-[10px] text-[#686868]">
            {durationMinutes} minutes
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 pb-6">
        <p className="text-sm font-medium text-[#686868]">{pagesRead} pages</p>
        <div className="flex items-center gap-x-2">
          <svg className="h-6 w-12">
            <use href="/sprite.svg#icon-line-diagram" />
          </svg>
          <button
            onClick={() => onDelete(session._id)}
            className="text-[#686868] hover:text-red-500"
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
}
