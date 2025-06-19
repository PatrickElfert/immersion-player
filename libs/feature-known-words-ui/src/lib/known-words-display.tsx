import { useKnownWordsStats } from '../hooks/useKnownWords.js';
import { Button } from '@heroui/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';

export function KnownWordsDisplay() {
  const { data, isLoading } = useKnownWordsStats();
  const queryClient = useQueryClient();

  return (
    <Button
      onPress={() => queryClient.resetQueries({ queryKey: ['knownWords'] })}
      startContent={isLoading ? null : <ReloadIcon />}
      color="primary"
      isLoading={isLoading}
      radius="full"
    >
      {data}
      <span className="font-light text-sm">Known Words</span>
    </Button>
  );
}
