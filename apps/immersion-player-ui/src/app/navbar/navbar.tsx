import { useBreadcrumbs } from '../breadcrumb/useBreadcrumbs.js';
import { KnownWordsDisplay } from '@immersion-player/feature-known-words-ui';

export function Navbar() {
  const { current } = useBreadcrumbs();

  return (
    <div className="px-8 py-6 shadow-left-glow flex justify-between items-center">
      <label className="text-white font-semibold text-2xl">{current}</label>
      <KnownWordsDisplay />
    </div>
  );
}
