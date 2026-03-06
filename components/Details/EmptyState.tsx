import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 md:gap-12 lg:gap-14">
      <div className="flex flex-col gap-3">
        <h2 className="text-foreground text-xl font-bold">Progress</h2>
        <p className="text-sm font-medium text-[#686868]">
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
      </div>
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--bg-blok) md:h-25 md:w-25">
        <div className="relative h-8 w-8 md:h-17.5 md:w-12.5">
          <Image
            src="/image/star_reading.png"
            alt="Empty library"
            fill
            sizes="(max-width: 768px) 32px, 50px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
