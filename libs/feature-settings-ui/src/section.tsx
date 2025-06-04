import { PropsWithChildren } from 'react';

export function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="p-3">
      <h2 className="text-white text-xl font-light mb-2">{props.title}</h2>
      {props.children}
    </div>
  );
}
