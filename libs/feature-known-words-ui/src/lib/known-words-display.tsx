import { useKnownWordsStats } from '../hooks/useKnownWords.js';

export function KnownWordsDisplay() {
  const { data, isFetching } = useKnownWordsStats();

  return (
    <div className="flex items-center text-white text-xl font-bold">
      {data} <span className="font-light text-sm ml-2">Known Words</span>
    </div>
  );
}
