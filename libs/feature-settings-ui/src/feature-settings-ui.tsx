import useSelectMediaFolder from "./hooks/useSelectMediaFolder.js";
import { useUserSettings } from "./hooks/useUserSettings.js";

export function FeatureSettingsUi() {
  const {selectMediaFolder} = useSelectMediaFolder();
  const {mediaFolder} = useUserSettings();

  return <div className="h-full gap-7 flex flex-col">
  <div className="flex flex-row items-center gap-4 mt-2">
      <button className="p-2 rounded bg-primary text-white" onClick={() => selectMediaFolder()}>Select Media Folder</button>
      <label className="text-white">{mediaFolder}</label>
    </div>
  </div>
}