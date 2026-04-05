import { BooksProgress, RemoveReadingBook } from '@/app/api/books';
import DiaryItem from './DiaryItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  progress: BooksProgress[];
  totalPages: number;
  bookId: string;
}

export default function Diary({ progress, totalPages, bookId }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeSession } = useMutation({
    mutationFn: (readingId: string) => RemoveReadingBook(bookId, readingId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['book', bookId] }),
  });

  const sessions = [...progress].filter((s) => s.finishReading).reverse();

  return (
    <ul className="flex flex-col">
      {sessions.map((session, index) => (
        <DiaryItem
          key={session._id}
          session={session}
          totalPages={totalPages}
          isLatest={index === 0}
          onDelete={removeSession}
        />
      ))}
    </ul>
  );
}
