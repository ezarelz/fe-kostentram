import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kos Tentram',
  description: 'Kos Tentram | Hunian nyaman dan strategis di Jakarta',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body
        className={`${quicksand.className} bg-white dark:bg-black text-gray-900 dark:text-white min-h-dvh`}
      >
        {/* ThemeProvider harus membungkus konten agar next-themes bisa kerja */}
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
