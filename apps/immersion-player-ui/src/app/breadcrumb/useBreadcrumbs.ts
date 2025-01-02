import { useLocation } from 'react-router-dom';

export function useBreadcrumbs() {
  const breadcrumbs = useLocation()
    .pathname.split('/')
    .filter((s) => s !== '');

  const current = breadcrumbs[breadcrumbs.length - 1];

  return {breadcrumbs, current};
}
