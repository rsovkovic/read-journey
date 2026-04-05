// 'use client';

// import { useEffect, useState } from 'react';
// import { getOwnBooks, BooksResponse } from '@/app/api/books';

// export default function TestBooksPage() {
//   const [books, setBooks] = useState<BooksResponse[] | null>(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getOwnBooks('done')
//       .then((data) => {
//         console.log('📚 Ваші книги:', data);
//         setBooks(data);
//       })
//       .catch((err) => {
//         console.error('Помилка запиту книг:', err);
//         setError(err.message);
//       });
//   }, []);

//   if (error) return <div>Помилка: {error}</div>;
//   if (!books) return <div>Завантаження списку книг...</div>;

//   return (
//     <div>
//       <h1>Власні книги ({books.length}):</h1>
//       <pre>{JSON.stringify(books, null, 2)}</pre>
//     </div>
//   );
// }
