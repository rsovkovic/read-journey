import api from './api';

export interface RecommendBooksResponse {
  results: ResultBook[];
  totalPages: number;
  page: number;
  perPage: number;
}
export interface ResultBook {
  _id: string;
  title: string;
  author: string;
  imageUrl?: string | null;
  totalPages: number;
  recommend: boolean;
}

export interface FetchBooksParams {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}
export interface AddNewBookRequest {
  title: string;
  author: string;
  totalPages: number;
}

export interface BooksProgress {
  _id: string;
  startPage: number;
  startReading: string; // ISO дата приходить рядком
  finishPage: number;
  finishReading: string;
  speed: number;
  status: 'active' | 'inactive';
}
export type BookStatus = 'unread' | 'in-progress' | 'done';

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BooksResponse {
  _id: string;
  title: string;
  author: string;
  imageUrl?: string | null;
  totalPages: number;
  status?: BookStatus;
  owner?: string;
  progress?: BooksProgress[];
  timeLeftToRead?: TimeLeft;
}
export interface RemoveBookResponse {
  _id: string;
  message: string;
}
export interface ReadingBookRequest {
  id: string;
  page: number;
}

//
export const fetchBooks = async ({
  title,
  author,
  page = 1,
  limit = 10,
}: FetchBooksParams): Promise<RecommendBooksResponse> => {
  const { data } = await api.get<RecommendBooksResponse>('/books/recommend', {
    params: {
      title: title?.trim() || undefined,
      author: author?.trim() || undefined,
      page,
      limit,
    },
  });
  return data;
};

//
export const addNewBook = async (
  bookData: AddNewBookRequest,
): Promise<BooksResponse> => {
  const { data } = await api.post<BooksResponse>('/books/add', bookData);
  return data;
};

//
export const addNewBookById = async (id: string): Promise<BooksResponse> => {
  const { data } = await api.post<BooksResponse>(`/books/add/${id}`);
  return data;
};

//
export const RemoveBookById = async (
  id: string,
): Promise<RemoveBookResponse> => {
  const { data } = await api.delete<RemoveBookResponse>(`/books/remove/${id}`);
  return data;
};

//
export const StartReadingBook = async (
  startData: ReadingBookRequest,
): Promise<BooksResponse> => {
  const { data } = await api.post<BooksResponse>(
    '/books/reading/start',
    startData,
  );
  return data;
};

//
export const FinishReadingBook = async (
  finishData: ReadingBookRequest,
): Promise<BooksResponse> => {
  const { data } = await api.post<BooksResponse>(
    '/books/reading/finish',
    finishData,
  );
  return data;
};

//
export const RemoveReadingBook = async (
  bookId: string,
  readingId: string,
): Promise<BooksResponse> => {
  const { data } = await api.delete<BooksResponse>('/books/reading', {
    params: {
      bookId,
      readingId,
    },
  });
  return data;
};

//
export const getOwnBooks = async (
  status?: BookStatus,
): Promise<BooksResponse[]> => {
  const { data } = await api.get<BooksResponse[]>('/books/own', {
    params: { status },
  });
  return data || [];
};

//
export const getBookById = async (id: string): Promise<BooksResponse> => {
  const { data } = await api.get<BooksResponse>(`/books/${id}`);
  return data;
};

// ...................................................

// const [filters, setFilters] = useState({ title: '', author: '' });
// const [page, setPage] = useState(1);

// ...........................

// const { data } = useQuery({
//   queryKey: ['books', filters, page], // Запит перезапуститься при зміні будь-якого з цих значень
//   queryFn: () => fetchBooks({ ...filters, page, limit: 10 }),
// });
