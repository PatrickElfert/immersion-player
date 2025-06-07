import { useBreadcrumbs } from '../breadcrumb/useBreadcrumbs.js';
import { KnownWordsDisplay } from '@immersion-player/feature-known-words-ui';
import { Suspense } from 'react';

export function Navbar() {
  const { current } = useBreadcrumbs();

  return (
    <div className="px-8 py-6 shadow-left-glow flex justify-between items-center">
      <label className="text-white font-semibold text-2xl">{current}</label>
      <Suspense fallback={<div className="h-10 w-60 bg-gray-700 animate-pulse rounded"></div>}>
        <KnownWordsDisplay />
      </Suspense>
    </div>
  );
}
