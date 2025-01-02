import { useBreadcrumbs } from '../breadcrumb/useBreadcrumbs';

export function Navbar() {
  const {current} = useBreadcrumbs();

  return <div className="px-8 py-6 shadow-left-glow">
    <label className="text-white font-semibold text-2xl">{current}</label>
  </div>
}
