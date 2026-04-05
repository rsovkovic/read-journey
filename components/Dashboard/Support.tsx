import Link from 'next/link';

export const SupportBlock = () => {
  return (
    <div className="mt-5 rounded-[20px] bg-(--bg-blok) p-5.5">
      <h3 className="text-foreground mb-5 text-lg font-bold">
        Start your workout
      </h3>

      <ol className="flex flex-col gap-5">
        <li className="flex gap-3">
          <span className="bg-foreground text-secondary-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
            1
          </span>
          <p className="text-foreground text-sm leading-4">
            Create a personal library:{' '}
            <span className="text-(--text-secondary)">
              add the books you intend to read to it.
            </span>
          </p>
        </li>

        <li className="flex gap-3">
          <span className="text-secondary-bg bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
            2
          </span>
          <p className="text-foreground text-sm leading-4">
            Create your first workout:{' '}
            <span className="text-(--text-secondary)">
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ol>
      <Link
        href="/library"
        className="group mt-5 flex items-center justify-between pt-4"
      >
        <span className="group-hover:text-foreground text-sm text-(--text-secondary) underline transition">
          My library
        </span>
        <svg className="h-6 w-6 transition-transform group-hover:translate-x-1">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
      </Link>
    </div>
  );
};
