'use client';
import AddBookForm from '@/components/Dashboard/AddBookForm';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import MyBooksList from '@/components/MyBooksList/MyBooksList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addNewBook,
  AddNewBookRequest,
  BooksResponse,
  RemoveBookById,
} from '@/app/api/books';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import RecommendedPreview from '@/components/Dashboard/RecommendedPreview';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import BookDetails from '@/components/BookDetailsModal/BookDetails';
import { Button } from '@/components/Ui/Button';
import SuccessContent from '@/components/SuccessContentModal/SuccessContent';

export default function MyLibraryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedBook, setSelectedBook] = useState<BooksResponse | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { mutate, isPending } = useMutation<
    BooksResponse,
    AxiosError<{ message: string }>,
    AddNewBookRequest
  >({
    mutationFn: addNewBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books'] });

      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  const { mutate: deleteBook } = useMutation({
    mutationFn: (id: string) => RemoveBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books'] });
      toast.success('Book deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });

  return (
    <section>
      <div className="container">
        <div className="mt-4 mb-8 flex flex-col items-stretch gap-4 lg:flex-row">
          <Dashboard>
            <AddBookForm
              isLoading={isPending}
              onAddBook={(data, resetForm) => {
                mutate(data, {
                  onSuccess: () => {
                    resetForm();
                  },
                });
              }}
            />
            <RecommendedPreview />
          </Dashboard>
          <div className="bg-secondary-bg size-[stretch] flex-1 rounded-[30px] p-5 lg:p-10">
            <MyBooksList
              onDeleteBook={deleteBook}
              onBookClick={(book: BooksResponse) => setSelectedBook(book)}
            />
          </div>
          {selectedBook && (
            <Modal onClose={() => setSelectedBook(null)}>
              <BookDetails
                book={selectedBook}
                actionButton={
                  <Button
                    type="submit"
                    variant="outline"
                    onClick={() => router.push(`/reading/${selectedBook._id}`)}
                  >
                    Start reading
                  </Button>
                }
              />
            </Modal>
          )}
          {isSuccessModalOpen && (
            <Modal onClose={() => setIsSuccessModalOpen(false)}>
              <SuccessContent type={'added'} />
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
}
