'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainNavigationProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function MainNavigation({
  isMobile,
  onClose,
}: MainNavigationProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/recommended' },
    { name: 'My library', href: '/library' },
  ];

  return (
    <ul
      className={`flex ${isMobile ? 'flex-col gap-5' : 'items-center gap-8 md:gap-10'}`}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`hover:text-foreground relative pb-2 text-lg transition-colors ${isActive ? 'text-foreground font-bold' : 'text-zinc-400'} `}
            >
              {link.name}
              {isActive && (
                <span className="bg-accent absolute bottom-0 left-0 h-1 w-full rounded-full" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
