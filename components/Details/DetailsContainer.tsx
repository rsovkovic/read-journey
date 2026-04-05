'use client';
import { useState } from 'react';
import Diary from './Diary';
import Statistics from './Statistics';
import EmptyState from './EmptyState';
import { BooksResponse } from '@/app/api/books';

export default function DetailsContainer({ book }: { book: BooksResponse }) {
  const [activeView, setActiveView] = useState<'diary' | 'stats'>('diary');

  const hasProgress = book.progress && book.progress.length > 0;

  if (!hasProgress) {
    return <EmptyState />;
  }

  return (
    <div className="bg-secondary-bg rounded-[30px]">
      <div className="mt-5 mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {activeView === 'diary' ? 'Diary' : 'Statistics'}
        </h2>
        <div className="flex gap-2">
          <button
            className={
              activeView === 'diary'
                ? 'text-foreground'
                : 'text-(--text-secondary)'
            }
            onClick={() => setActiveView('diary')}
          >
            <svg name="hourglass" className="h-5 w-5">
              <use href="/sprite.svg#icon-hourglass" />
            </svg>
          </button>
          <button
            className={
              activeView === 'stats'
                ? 'text-foreground'
                : 'text-(--text-secondary)'
            }
            onClick={() => setActiveView('stats')}
          >
            <svg name="pie-chart" className="h-5 w-5">
              <use href="/sprite.svg#icon-diary" />
            </svg>
          </button>
        </div>
      </div>
      {activeView === 'stats' && (
        <p className="hidden pb-5 text-sm font-medium text-[#686868] lg:block">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}

      <div className="rounded-3xl bg-(--input-bg) p-5">
        {activeView === 'diary' ? (
          <Diary
            progress={book.progress || []}
            totalPages={book.totalPages}
            bookId={book._id}
          />
        ) : (
          <Statistics
            progress={book.progress || []}
            totalPages={book.totalPages}
          />
        )}
      </div>
    </div>
  );
}
