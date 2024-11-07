import {FormEvent} from "react";
import {cn} from "@immersion-player/shared-utils";

export interface SearchFieldProps {
  onChange: (value: string) => void;
  debounce?: number;
  className?: string;
}

export default function SearchField(props: SearchFieldProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    setTimeout(() => {
      props.onChange(event.currentTarget.value);
    }, props.debounce ?? 0);
  }

  return <input className={cn(props.className, 'h-[3rem]')} placeholder="Test" onInput={handleOnInput}/>
}
