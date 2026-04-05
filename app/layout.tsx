import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { AuthGuard } from '@/components/AuthGuard/AuthGuard';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Read Journey',
  description: 'Track your reading progress and statistics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased`}
      >
        <TanStackProvider>
          <AuthGuard>
            <Header />
            {children}
          </AuthGuard>
        </TanStackProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
