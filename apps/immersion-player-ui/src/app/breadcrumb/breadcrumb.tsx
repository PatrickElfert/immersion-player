import home from '../../assets/home-line.svg';
import chevronRight from '../../assets/chevron-right.svg';
import { cn } from '@immersion-player/shared-utils';
import { useBreadcrumbs } from './useBreadcrumbs.js';

export const Breadcrumb = () => {
  const {breadcrumbs} = useBreadcrumbs();

  return (
    <div className="text-white flex pb-4 items-center">
      <img className="w-4 h-4" src={home} />
      <img className="w-4 h-4 ml-3 mr-3" src={chevronRight} />

      {breadcrumbs.map((b, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={index} className="flex items-center">
            <div
              className={cn('text-white', {
                'text-primary': isLast,
              })}
            >
              {b}
            </div>
            {!isLast && (
              <img className="w-4 h-4 ml-3 mr-3" src={chevronRight} />
            )}
          </div>
        );
      })}
    </div>
  );
};
