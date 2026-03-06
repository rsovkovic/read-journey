import { Input } from '@/components/Ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../Ui/Button';
// import Image from 'next/image';
import { BooksResponse } from '@/app/api/books';
import { createAddReadingSchema } from '@/utils/validationSchemas';

interface Props {
  book: BooksResponse;
  onStart: (page: number) => void; // Функція для виклику мутації Start
  onStop: (page: number) => void; // Функція для виклику мутації Stop
  isLoading?: boolean;
}
export default function AddReading({ book, onStart, onStop }: Props) {
  // Шукаємо активну сесію
  const activeSession = book?.progress?.find(
    (session) => session.status === 'active',
  );
  const isReading = !!activeSession;

  // Визначаємо початкове значення для інпуту
  // Якщо ми починаємо нову сесію, за замовчуванням це наступна сторінка після останньої прочитаної
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

// /////////////////////////////////////////////////////
// Якщо прогресу ще немає — показуємо зірку
//       {!book?.progress || book.progress.length === 0 ? (
//         <div className="flex flex-col items-center justify-center gap-5 py-20 md:gap-12 lg:gap-14">
//           <div className="flex flex-col gap-3">
//             <h2 className="text-foreground text-xl font-bold">Progress</h2>
//             <p className="text-sm font-medium text-[#686868]">
//               Here you will see when and how much you read. To record, click on
//               the red button above.
//             </p>
//           </div>
//           <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--bg-blok) md:h-25 md:w-25">
//             <div className="relative h-8 w-8 md:h-17.5 md:w-12.5">
//               <Image
//                 src="/image/star_reading.png"
//                 alt="Empty library"
//                 fill
//                 sizes="(max-width: 768px) 32px, 50px"
//                 className="object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-8">
//           <h2 className="text-foreground mb-4 text-xl font-bold">Progress</h2>
//           {/* Тут ми пізніше створимо список сесій (компонент MyReading) */}
//           <p className="text-white">Сесії будуть тут...</p>
//         </div>
//       )}

/////////////////////////////////////////////

// import { Input } from '@/components/Ui/Input';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { Button } from '../Ui/Button';
// import Image from 'next/image';

// interface Props {
//   isLoading?: boolean;
// }
// export default function AddReading() {
//   return (
//     <form className="flex w-full max-w-md flex-col gap-3">
//       <p className="text-foreground text-sm font-medium lg:pt-8">Start page:</p>
//       <Input
//         label="Page number:"
//         type="number"
//         // {}
//         // error={}
//         placeholder="0"
//       />
//       <Button type="submit" variant="outline">
//         {isReading ? 'To stop' : 'To start'}
//       </Button>
//       <div className="flex flex-col items-center justify-center gap-5 py-20 md:gap-12 lg:gap-14">
//         <div className="flex flex-col gap-3">
//           <h2 className="text-foreground text-xl font-bold">Progress</h2>
//           <p className="text-sm font-medium text-[#686868]">
//             Here you will see when and how much you read. To record, click on
//             the red button above.
//           </p>
//         </div>
//         <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--bg-blok) md:h-25 md:w-25">
//           <div className="relative h-8 w-8 md:h-17.5 md:w-12.5">
//             <Image
//               src="/image/star_reading.png"
//               alt="Empty library"
//               fill
//               sizes="(max-width: 768px) 32px, 50px"
//               className="object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
