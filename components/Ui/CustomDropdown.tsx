import { useState, useRef, useEffect } from 'react';

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> {
  options: Option<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function CustomDropdown<T>({
  options,
  selectedValue,
  onChange,
  className = '',
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLabel = options.find(
    (opt) => opt.value === selectedValue,
  )?.label;

  return (
    <div className={`relative z-20 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-30 items-center justify-between gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-xs text-white transition-all hover:border-white/30 md:min-w-37.5 md:text-sm"
      >
        <span className="truncate">{currentLabel}</span>
        <svg
          className={`h-4 w-4 text-white transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
        >
          <use href="/sprite.svg#icon-chevron-up"></use>
        </svg>
      </button>

      {isOpen && (
        <ul className="animate-in fade-in zoom-in absolute right-0 mt-2 w-full min-w-37.5 overflow-hidden rounded-[15px] bg-[#262626] p-2 shadow-2xl ring-1 ring-white/5 duration-200">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer rounded-[10px] px-3 py-2 text-sm transition-colors ${
                selectedValue === option.value ? 'text-white' : 'text-white/50'
              } hover:bg-white/5 hover:text-white`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
