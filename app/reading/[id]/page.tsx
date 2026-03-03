'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getBookById,
  BooksResponse,
  StartReadingBook,
  FinishReadingBook,
} from '@/app/api/books';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import MyReadingBooks from '@/components/MyReadingBooks/MyReadingBooks';
import AddReadingForm from '@/components/Dashboard/AddReadingForm';

export default function ReadingPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery<BooksResponse>({
    queryKey: ['book', id],
    queryFn: () => getBookById(id as string),
  });

  // Мутація для START
  const startMutation = useMutation({
    mutationFn: (page: number) =>
      StartReadingBook({ id: id as string, page: page }),
    onSuccess: () => {
      // Оновлюємо дані книги після успішного старту
      queryClient.invalidateQueries({ queryKey: ['book', id] });
    },
  });

  // Мутація для STOP
  const stopMutation = useMutation({
    mutationFn: (page: number) =>
      FinishReadingBook({ id: id as string, page: page }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', id] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!book) return <div>Book not found</div>;

  return (
    <section>
      <div className="container">
        <div className="mt-4 mb-8 flex flex-col items-stretch gap-4 lg:flex-row">
          <Dashboard>
            <AddReadingForm
              book={book}
              onStart={(page) => startMutation.mutate(page)}
              onStop={(page) => stopMutation.mutate(page)}
            />
          </Dashboard>

          <div className="bg-secondary-bg size-[stretch] min-w-0 flex-1 rounded-[30px]">
            <MyReadingBooks book={book} />
          </div>
        </div>
      </div>
    </section>
  );
}
