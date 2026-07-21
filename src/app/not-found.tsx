import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <FileQuestion className="h-16 w-16 text-slate-400 mb-4" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
