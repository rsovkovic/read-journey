// export const formatDate = (isoString: string) => {
//   const date = new Date(isoString);

//   // Форматуємо дату: 19.04.2025
//   const dmy = new Intl.DateTimeFormat('uk-UA', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(date);

//   // Форматуємо час: 20:15
//   const hm = new Intl.DateTimeFormat('uk-UA', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }).format(date);

//   return { dmy, hm };
// };

export const formatDate = (isoString: string | undefined | null) => {
  if (!isoString) {
    return { dmy: '00.00.0000', hm: '00:00' };
  }
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return { dmy: '00.00.0000', hm: '00:00' };
  }

  // 3. Форматуємо
  const dmy = new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  const hm = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return { dmy, hm };
};
