import { PropsWithChildren } from 'react';
import { cn } from '@immersion-player/shared-utils';
import { KnownWordsStatus } from '@immersion-player/shared-types';

export function WordStatusHighlighting(props: PropsWithChildren & {status: KnownWordsStatus}) {
  return (
    <span
      className={cn('underline underline-offset-[6px] decoration-2 px-0.5', {
        'decoration-green-600': props.status === 'KNOWN',
        'decoration-yellow-600': props.status === 'MINED',
        'decoration-red-600': props.status === 'UNKNOWN',
      })}
    >
      {props.children}
    </span>
  );
}
