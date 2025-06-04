import * as React from 'react';
import { Accordion as AccordionRadix } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@immersion-player/shared-utils';

export interface AccordionItem {
  value: string;
  children: ReactNode;
}

const Accordion = (props: { items: AccordionItem[] }) => (
  <AccordionRadix.Root className="w-full rounded-md bg-gray-500" type="single" collapsible>
    {props.items.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger>{item.value}</AccordionTrigger>
        <AccordionContent>{item.children}</AccordionContent>
      </AccordionItem>
    ))}
  </AccordionRadix.Root>
);

const AccordionItem = React.forwardRef(({ children, className, ...props }: PropsWithChildren<any>, forwardedRef) => (
  <AccordionRadix.Item
    className={cn(
      'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionRadix.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }: PropsWithChildren<any>, forwardedRef) => (
  <AccordionRadix.Header className="flex">
    <AccordionRadix.Trigger
      className={cn(
        'group flex h-[45px] flex-1 cursor-default items-center justify-between bg-gray-800 px-5 text-[15px] leading-none text-white outline-none hover:bg-gray-600',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-primary transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </AccordionRadix.Trigger>
  </AccordionRadix.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }: PropsWithChildren<any>, forwardedRef) => (
  <AccordionRadix.Content
    className={cn(
      'overflow-hidden bg-gray-700 text-[15px] text-white data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </AccordionRadix.Content>
));

export default Accordion;
