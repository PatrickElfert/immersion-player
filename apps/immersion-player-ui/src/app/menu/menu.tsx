/* eslint-disable-next-line */
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import {cn} from "@immersion-player/shared-utils";

function MenuItem({
  label,
  active,
  icon,
}: {
  label: string;
  active: boolean;
  icon: string;
}) {
  return (
    <div
      className={cn(
        'cutout flex items-center justify-center w-[216px] h-[92px]',
        { 'bg-primary-gradient': active, 'bg-surface cursor-pointer': !active }
      )}
    >
      <div
        className={cn('flex flex-row items-center flex-1', {
          'text-white opacity-60': !active,
        })}
      >
        <div className="rounded-full bg-surface h-max w-max p-2 ml-4 mr-3">
          <img className="w-4 h-4" src={icon} />
        </div>
        <label className="font-semibold cursor-pointer">{label}</label>
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <div className="pt-20 bg-surface flex flex-col items-end shadow-white-right">
      <MenuItem icon={home} active={true} label={'Library'}></MenuItem>
      <MenuItem icon={settings} active={false} label={'Settings'}></MenuItem>
    </div>
  );
}

export default Menu;
