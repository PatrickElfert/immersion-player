import { Button } from '@heroui/react';
import { ArchiveIcon } from '@radix-ui/react-icons';
import { useUserSettings } from './hooks/useUserSettings.js';
import useSelectMediaFolder from './hooks/useSelectMediaFolder.js';

export function MediaFolder() {
  const { selectMediaFolder } = useSelectMediaFolder();
  const { mediaFolder } = useUserSettings();
  return (
    <div className="flex flex-row items-center gap-4">
      <Button startContent={<ArchiveIcon />} color="primary" onPress={() => selectMediaFolder()}>
        Select Media Folder
      </Button>
      <label className="text-white">{mediaFolder}</label>
    </div>
  );
}
