import useSelectMediaFolder from './hooks/useSelectMediaFolder.js';
import { useUserSettings } from './hooks/useUserSettings.js';
import { Section } from './section.js';
import { ModelFields } from './model-fields.js';
import { Button } from '@heroui/react';
import { ArchiveIcon } from '@radix-ui/react-icons';

export function FeatureSettingsUi() {
  const { selectMediaFolder } = useSelectMediaFolder();
  const { mediaFolder } = useUserSettings();

  return (
    <div className="h-full gap-7 flex flex-col mx-5 min-w-[940px] max-w-[940px]">
      <Section title={'Media'}>
        <div className="flex flex-row items-center gap-4">
          <Button startContent={<ArchiveIcon/>} color="primary" onPress={() => selectMediaFolder()}>
            Select Media Folder
          </Button>
          <label className="text-white">{mediaFolder}</label>
        </div>
      </Section>
      <ModelFields></ModelFields>
    </div>
  );
}
