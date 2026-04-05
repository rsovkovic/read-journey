import Image from 'next/image';

export const Quote = () => {
  return (
    <div className="mt-5 flex items-center gap-3.5 rounded-[20px] bg-(--bg-blok) p-5">
      <Image
        src="/image/books_desktop.png"
        alt="Empty library"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
      <p className="text-sm leading-tight text-(--text-secondary)">
        &quot;Books are{' '}
        <span className="text-foreground font-medium">windows</span> to the
        world, and reading is a journey into the unknown.&quot;
      </p>
    </div>
  );
};
