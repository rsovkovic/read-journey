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
import SuccessContent from '@/components/SuccessContentModal/SuccessContent';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import DetailsContainer from '@/components/Details/DetailsContainer';

export default function ReadingPage() {
  const { id } = useParams(); // Отримуємо ID з URL
  const queryClient = useQueryClient();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      toast.success('Reading session started!'); // Успіх
    },
    onError: (error: AxiosError<{ message: string }>) => {
      // Дістаємо повідомлення про помилку з відповіді бекенду
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage); // Відображення помилки у вспливаючому вікні
    },
  });

  // Мутація для STOP
  const stopMutation = useMutation({
    mutationFn: (page: number) =>
      FinishReadingBook({ id: id as string, page: page }),
    onSuccess: (data, variables) => {
      const finishedPage = variables;
      queryClient.invalidateQueries({ queryKey: ['book', id] });

      if (finishedPage === book?.totalPages) {
        setIsSuccessModalOpen(true); // Відкриваємо модалку привіту
      } else {
        toast.success('Reading session stopped!');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'Failed to stop reading';
      toast.error(errorMessage);
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
            <DetailsContainer book={book} />
          </Dashboard>

          <div className="bg-secondary-bg size-[stretch] min-w-0 flex-1 rounded-[30px]">
            <MyReadingBooks book={book} />
          </div>
        </div>
        {isSuccessModalOpen && (
          <Modal onClose={() => setIsSuccessModalOpen(false)}>
            <SuccessContent type={'finished'} />
          </Modal>
        )}
      </div>
    </section>
  );
}
