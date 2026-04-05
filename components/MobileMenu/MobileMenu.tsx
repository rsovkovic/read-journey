'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MainNavigation from '../MainNavigation/MainNavigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, onClose, onLogout }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 flex w-2/3 flex-col bg-zinc-900 p-8 shadow-2xl"
          >
            <button className="self-end" onClick={onClose}>
              <svg className="h-7 w-7 stroke-white">
                <use href="/sprite.svg#icon-close-menu" />
              </svg>
            </button>

            <nav className="mt-20 flex flex-col items-center gap-8">
              <MainNavigation isMobile onClose={onClose} />
            </nav>

            <div className="mt-auto flex justify-center">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="rounded-full border border-white/20 px-5 py-3 font-bold text-white transition duration-200 ease-out hover:bg-white hover:text-black active:scale-95"
              >
                Log out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
