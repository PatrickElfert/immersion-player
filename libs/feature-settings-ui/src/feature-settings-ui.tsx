import { Section } from './section.js';
import { ModelFields } from './model-fields.js';
import { MediaFolder } from './media-folder.js';
import { Suspense } from 'react';

export function FeatureSettingsUi() {
  return (
    <div className="h-full gap-7 flex flex-col mx-5 min-w-[940px] max-w-[940px]">
      <Section title={'Media'}>
        <Suspense fallback={null}>
          <MediaFolder />
        </Suspense>
      </Section>

      <Section title="Field Mappings">
        <Suspense fallback={null}>
          <ModelFields></ModelFields>
        </Suspense>
      </Section>
    </div>
  );
}
