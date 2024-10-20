/* eslint-disable-next-line */
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import { cn } from '../cn';

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
      className={cn('flex flex-row h-[88px] w-full', {
        'bg-primary-gradient': active,
      })}
    >
      <div className="flex-1 bg-plum">

      </div>
      <div className="flex-col w-[216px] flex">
        <div className="bg-plum h-3 rounded-br-full"></div>
        <div
          className={cn('flex flex-row items-center flex-1', {
            'text-white opacity-60': !active,
          })}
        >
          <div className="rounded-full bg-plum h-max w-max p-2 ml-4 mr-3">
            <img className="w-4 h-4" src={icon}/>
          </div>
          <label className="font-semibold">{label}</label>
        </div>
        <div className="bg-plum h-3 rounded-tr-full"></div>
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <div className="bg-plum flex flex-col items-end">
      <MenuItem icon={home} active={true} label={'Library'}></MenuItem>
      <MenuItem icon={settings} active={false} label={'Settings'}></MenuItem>
    </div>
  );
}

export default Menu;
