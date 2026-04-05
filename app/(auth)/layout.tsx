import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background container flex min-h-screen items-center justify-center p-5 md:p-8">
      <div className="flex min-h-175 w-full max-w-7xl flex-col gap-3 overflow-hidden rounded-[30px] lg:flex-row">
        <div className="bg-secondary-bg flex w-full flex-col rounded-[30px] p-8 md:p-16 lg:w-1/2">
          <div className="mb-10 flex items-center gap-2 md:mb-20">
            <div className="flex h-8 w-8 items-center justify-center">
              <svg>
                <use href="/sprite.svg#icon-logo" />
              </svg>
            </div>
            <span className="text-foreground text-xl font-bold tracking-tighter uppercase">
              Read Journey
            </span>
          </div>

          <h1 className="text-foreground mb-10 max-w-112.5 text-5xl leading-[1.1] font-semibold md:text-6xl">
            Expand your mind, reading{' '}
            <span className="text-(--text-secondary)">a book</span>
          </h1>

          <div className="grow">{children}</div>
        </div>

        <div className="bg-secondary-bg hidden items-end justify-center overflow-hidden rounded-[30px] px-10 pt-10 lg:flex lg:w-1/2">
          <div className="relative w-full max-w-100">
            <Image
              src="/image/iPhone-15-Black.png"
              alt="iPhone App Preview"
              width={405}
              height={735}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
