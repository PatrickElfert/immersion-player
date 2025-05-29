import { useState } from "react";
import useSelectMediaFolder from "./hooks/useSelectMediaFolder.js";

export function FeatureSettingsUi() {
  const {selectMediaFolder} = useSelectMediaFolder();

  return <div className="h-full gap-7 flex flex-col">
    <button onClick={() => selectMediaFolder()}>Select Media Folder</button>
  </div>
}