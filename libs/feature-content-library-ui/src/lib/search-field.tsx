import { ChangeEvent } from 'react';
import { Input } from '@heroui/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export interface SearchFieldProps {
  onChange: (value: string) => void;
  debounce?: number;
  className?: string;
}

export default function SearchField(props: SearchFieldProps) {
  function handleOnInput(event: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      props.onChange(event.target.value);
    }, props.debounce ?? 0);
  }

  return (
    <div className="flex w-full pt-4">
      <Input onChange={handleOnInput} placeholder={'Search for...'} endContent={<MagnifyingGlassIcon />} />
    </div>
  );
}
