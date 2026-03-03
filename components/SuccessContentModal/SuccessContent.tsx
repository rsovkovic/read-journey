import Image from 'next/image';

export default function SuccessContent({
  type,
}: {
  type: 'added' | 'finished';
}) {
  const isAdded = type === 'added';
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-5 text-6xl">
        <div className="relative h-12.5 w-12.5 md:h-17.5 md:w-17">
          {isAdded ? (
            <Image
              src="/image/Good_job.png"
              alt="Empty library"
              fill
              sizes="(max-width: 768px) 50px, 68px"
              className="object-contain"
            />
          ) : (
            <Image
              src="/image/books_desktop.png"
              alt="Empty library"
              fill
              sizes="(max-width: 768px) 50px, 68px"
              className="object-contain"
            />
          )}
        </div>
        {/* Або картинки з макету */}
      </div>
      <h3 className="text-foreground mb-2 text-xl font-bold">
        {isAdded ? 'Good job' : 'The book is read'}
      </h3>
      <p className="text-sm text-(--text-secondary)">
        {isAdded ? (
          <p>
            {' '}
            Your book is now in{' '}
            <span className="text-foreground">the library!</span> The joy knows
            no bounds and now you can start your training
          </p>
        ) : (
          <p>
            It was an <span className="text-foreground">exciting journey</span>,
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>
        )}
      </p>
    </div>
  );
}

/* Your book is now in the library! The joy knows no bounds and now you can start your training */
