import {ChangeEvent, FormEvent} from 'react';
import search from './search-normal.svg';

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
    <div className="relative flex items-center mt-2">
      <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
        <img className="pr-4" src={search} />
      </button>

      <input
        onChange={handleOnInput}
        type="text"
        placeholder="Search"
        className="block w-full py-2.5 placeholder-white text-white bg-white bg-opacity-5 placeholder-opacity-50 pl-5 pr-11 outline-none"
      />
    </div>
  );
}
