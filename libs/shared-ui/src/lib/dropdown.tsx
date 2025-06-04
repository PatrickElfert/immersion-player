import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { cn } from '@immersion-player/shared-utils';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Select } from 'radix-ui';

export function Dropdown(props: { options: string[] }) {
  return (
    <Select.Root>
      <Select.Trigger className="inline-flex items-center text-white p-2 rounded bg-gray-700 gap-2">
        <Select.Value placeholder="Select a note type" />
        <Select.Icon className="text-primary">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          sideOffset={5}
          position="popper"
          align="start"
          className="overflow-hidden rounded-md bg-gray-700 text-white"
        >
          <Select.Viewport className="p-[5px]">
            {props.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const SelectItem = forwardRef(
  (
    { children, className, ...props }: PropsWithChildren<{ className?: string; value: string }>,
    forwardedRef: ForwardedRef<any>
  ) => {
    return (
      <Select.Item
        className={cn(
          'relative flex h-[25px] select-none items-center rounded pl-[25px] pr-[35px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[disabled]:text-gray-500 data-[highlighted]:outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default Select;
