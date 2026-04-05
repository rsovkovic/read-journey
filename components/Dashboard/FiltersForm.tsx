import { useForm } from 'react-hook-form';
import { Input } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface Filters {
  title: string;
  author: string;
}

interface Props {
  onFilter: (data: Filters) => void;
}

export const FiltersForm = ({ onFilter }: Props) => {
  const { register, handleSubmit, reset } = useForm<Filters>();

  const onSubmit = (data: Filters) => {
    onFilter(data);
  };

  const handleReset = () => {
    reset();
    onFilter({ title: '', author: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <p className="text-foreground text-sm leading-4 font-medium lg:pt-8">
        Filters:
      </p>
      <Input
        label="Book title:"
        {...register('title')}
        aria-label="Book title"
        autoComplete="title"
        placeholder="Enter text"
      />

      <Input
        label="The author:"
        {...register('author')}
        aria-label="The author"
        autoComplete="author"
        placeholder="Enter text"
      />
      <div className="mt-5 flex gap-2">
        <Button type="submit" variant="outline">
          To apply
        </Button>

        <button
          type="button"
          onClick={handleReset}
          className="hover:text-foreground px-4 py-3 text-sm font-medium text-(--text-secondary) underline transition-colors"
        >
          Reset filters
        </button>
      </div>
    </form>
  );
};
