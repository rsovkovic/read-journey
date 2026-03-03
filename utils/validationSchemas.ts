import * as Yup from 'yup';

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export const addBookSchema = Yup.object().shape({
  title: Yup.string().required('Book title is required'),
  author: Yup.string().required('Author is required'),
  totalPages: Yup.number()
    .typeError('Must be a number')
    .required('Number of pages is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
});

// export const addReadingSchema = Yup.object().shape({
//   page: Yup.number()
//     .typeError('Must be a number')
//     .required('Required')
//     .min(1, 'Min 1')
//     .max(book?.totalPages || 9999, `Max ${book?.totalPages || ''}`),
// });

// export const getAddReadingSchema = (book?: { totalPages?: number }) =>
//   Yup.object().shape({
//     page: Yup.number()
//       .typeError('Must be a number')
//       .required('Required')
//       .min(1, 'Min 1')
//       .max(book?.totalPages || 9999, `Max ${book?.totalPages || ''}`),
//   });

export const createAddReadingSchema = (totalPages: number) =>
  Yup.object().shape({
    page: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .min(1, 'Min 1')
      .max(totalPages, `Max ${totalPages}`),
  });
