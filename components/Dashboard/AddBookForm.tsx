import { AddNewBookRequest } from '@/app/api/books';
import { addBookSchema } from '@/utils/validationSchemas';
import { Input } from '@/components/Ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../Ui/Button';

interface Props {
  onAddBook: (data: AddNewBookRequest, callback: () => void) => void;
  isLoading?: boolean;
}

export default function AddBookForm({ onAddBook, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewBookRequest>({
    resolver: yupResolver(addBookSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: AddNewBookRequest) => {
    onAddBook(data, () => reset());
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <p className="text-foreground text-sm font-medium lg:pt-8">
        Create your library:
      </p>
      <Input
        label="Book title:"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Enter text"
      />

      <Input
        label="The author:"
        {...register('author')}
        error={errors.author?.message}
        placeholder="Enter text"
      />

      <Input
        label="Number of pages:"
        type="number"
        {...register('totalPages')}
        error={errors.totalPages?.message}
        placeholder="0"
      />
      <div className="mt-5 mb-5 flex gap-2">
        <Button type="submit" variant="outline" isLoading={isLoading}>
          Add book
        </Button>
        <button
          type="button"
          onClick={handleReset}
          className="hover:text-foreground px-4 py-3 text-sm font-medium text-(--text-secondary) underline transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
