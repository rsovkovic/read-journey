import { Input } from '@/components/Ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../Ui/Button';
import { BooksResponse } from '@/app/api/books';
import { createAddReadingSchema } from '@/utils/validationSchemas';

interface Props {
  book: BooksResponse;
  onStart: (page: number) => void;
  onStop: (page: number) => void;
  isLoading?: boolean;
}
export default function AddReading({ book, onStart, onStop }: Props) {
  const activeSession = book?.progress?.find(
    (session) => session.status === 'active',
  );
  const isReading = !!activeSession;
  const lastFinishedPage = book?.progress?.length
    ? book.progress[book.progress.length - 1].finishPage
    : 0;

  const schema = createAddReadingSchema(book?.totalPages || 9999);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      page: isReading ? 0 : lastFinishedPage,
    },
  });

  const onSubmit = (data: { page: string | number }) => {
    const page = Number(data.page);
    if (isReading) {
      onStop(page);
    } else {
      onStart(page);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-5"
    >
      <p className="text-foreground text-sm font-medium lg:pt-8">
        {isReading ? 'Stop page:' : 'Start page:'}
      </p>
      <Input
        label="Page number:"
        type="number"
        {...register('page')}
        error={errors.page?.message}
        placeholder=""
      />
      <Button type="submit" variant="outline">
        {isReading ? 'To stop' : 'To start'}
      </Button>
    </form>
  );
}
