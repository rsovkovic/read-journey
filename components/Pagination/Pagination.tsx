interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
  isLoading?: boolean;
}
export default function Pagination({
  page,
  total,
  onChange,
  isLoading,
}: PaginationProps) {
  return (
    <nav className="flex gap-2">
      <button
        type="button"
        className="flex, items-center, hover:border-foreground h-8 w-8 justify-center rounded-full border border-gray-600 p-2 transition duration-200 ease-out hover:bg-gray-800 active:enabled:scale-95 disabled:cursor-not-allowed disabled:opacity-20 sm:h-10 sm:w-10"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1 || isLoading}
        aria-label="Previous page"
      >
        <svg className="h-4 w-4 stroke-white sm:h-5 sm:w-5">
          <use href="/sprite.svg#icon-chevron-left" />
        </svg>
      </button>
      <button
        type="button"
        className="flex, items-center, hover:border-foreground h-8 w-8 justify-center rounded-full border border-gray-600 p-2 transition duration-200 ease-out hover:bg-gray-800 active:enabled:scale-95 disabled:cursor-not-allowed disabled:opacity-20 sm:h-10 sm:w-10"
        onClick={() => onChange(page + 1)}
        disabled={page >= total || isLoading}
        aria-label="Next page"
      >
        <svg className="h-4 w-4 stroke-white sm:h-5 sm:w-5">
          <use href="/sprite.svg#icon-chevron-right" />
        </svg>
      </button>
    </nav>
  );
}
