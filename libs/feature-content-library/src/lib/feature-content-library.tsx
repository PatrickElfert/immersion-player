/* eslint-disable-next-line */

function MediaCard() {
  return (
    <div className="relative h-[345px] w-[300px] bg-primary bg-[url('assets/shirokumacover.png')] bg-cover flex items-end rounded">
      <div className="absolute bg-black h-full w-full opacity-20"></div>
      <label className="font-semibold text-2xl text-white p-3 z-10 relative">
        Shirokuma Cafe
      </label>
    </div>
  );
}

export function FeatureContentLibrary() {
  return (
    <div className="h-full flex flex-row flex-wrap gap-4 min-h-0 overflow-auto">
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
    </div>
  );
}

export default FeatureContentLibrary;
