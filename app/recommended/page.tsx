'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BooksResponse,
  fetchBooks,
  RecommendBooksResponse,
  addNewBookById,
  getOwnBooks,
} from '@/app/api/books';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { SupportBlock } from '@/components/Dashboard/Support';
import { Quote } from '@/components/Dashboard/Quote';
import BooksRecommended from '@/components/BooksRecommended/BooksRecommended';
import { FiltersForm } from '@/components/Dashboard/FiltersForm';
import Modal from '@/components/Modal/Modal';
import BookDetails from '@/components/BookDetailsModal/BookDetails';
import { Button } from '@/components/Ui/Button';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import SuccessContent from '@/components/SuccessContentModal/SuccessContent';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ title: '', author: '' });
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();

  const [selectedBook, setSelectedBook] = useState<BooksResponse | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLimit(2);
      } else if (window.innerWidth < 1040) {
        setLimit(8);
      } else {
        setLimit(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApplyFilters = (data: { title: string; author: string }) => {
    setFilters(data);
    setPage(1);
  };

  const { mutate: handleAddBook, isPending } = useMutation<
    BooksResponse,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (id: string) => addNewBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books'] });

      setSelectedBook(null);

      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  const { data: ownBooks } = useQuery<BooksResponse[], AxiosError>({
    queryKey: ['user-books'],
    queryFn: () => getOwnBooks(),
  });
  const isAlreadyInLibrary =
    !!selectedBook &&
    ownBooks?.some(
      (ownBook) =>
        ownBook.title.toLowerCase() === selectedBook?.title.toLowerCase() &&
        ownBook.author.toLowerCase() === selectedBook?.author.toLowerCase(),
    );

  const { data, isLoading, isError } = useQuery<RecommendBooksResponse>({
    queryKey: ['books', page, filters, limit],
    queryFn: () =>
      fetchBooks({
        ...filters,
        page,
        limit,
      }),
    placeholderData: (prev) => prev,
  });
  return (
    <section>
      <div className="container">
        <div className="mt-4 mb-8 flex flex-col items-stretch gap-4 lg:flex-row">
          <Dashboard>
            <FiltersForm onFilter={handleApplyFilters} />
            <SupportBlock />
            <div className="hidden lg:block">
              <Quote />
            </div>
          </Dashboard>

          <div className="bg-secondary-bg size-[stretch] min-w-0 flex-1 rounded-[30px]">
            <BooksRecommended
              data={data}
              isLoading={isLoading}
              isError={isError}
              page={page}
              onPageChange={(nextPage) => setPage(nextPage)}
              onBookClick={(book: BooksResponse) => setSelectedBook(book)}
            />
          </div>
          {selectedBook && (
            <Modal onClose={() => setSelectedBook(null)}>
              <BookDetails
                book={selectedBook}
                actionButton={
                  isAlreadyInLibrary ? (
                    <Button variant="outline" disabled>
                      Already in library
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => {
                        if (selectedBook?._id) {
                          handleAddBook(selectedBook._id);
                        }
                      }}
                    >
                      {isPending ? 'Adding...' : 'Add to library'}
                    </Button>
                  )
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
