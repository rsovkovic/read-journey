import { BooksProgress } from '@/app/api/books'; // Імпортуй свій інтерфейс

interface Props {
  progress: BooksProgress[]; // Тут ми вже впевнені, що він є
  totalPages: number;
}

export default function Statistics({ progress, totalPages }: Props) {
  return (
    <div>
      <h3>Hello World!!</h3>
    </div>
  );
}
