// 'use client';
// import { useEffect, useState } from 'react';
// import { usersCurrent } from '@/app/api/auth';
// import { SupportBlock } from '@/components/Dashboard/Support';
// import { Quote } from '@/components/Dashboard/Quote';

// export default function TestPage() {
//   const [result, setResult] = useState('loading...');

//   useEffect(() => {
//     usersCurrent()
//       .then((data) => {
//         console.log('Data received:', data);
//         setResult(JSON.stringify(data, null, 2));
//       })
//       .catch((err) => {
//         console.error('error:', err);
//         setResult('error: ' + err.message);
//       });
//   }, []);

//   return (
//     <div>
//       <h1> results API:</h1>
//       <pre>{result}</pre>
//       <SupportBlock />
//       <Quote />
//     </div>
//   );
// }
