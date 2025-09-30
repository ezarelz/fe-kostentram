import Link from 'next/link';
import { cn } from '@/lib/cn';

export default function Button({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const base = cn(
    'inline-block rounded-xl px-5 py-3 font-semibold bg-orange-500 text-white cursor-pointer hover:bg-orange-600',
    className
  );
  return href ? (
    <Link href={href} className={base}>
      {children}
    </Link>
  ) : (
    <button className={base}>{children}</button>
  );
}
