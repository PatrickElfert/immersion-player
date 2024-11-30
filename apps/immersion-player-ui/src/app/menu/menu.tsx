/* eslint-disable-next-line */
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import {cn} from "@immersion-player/shared-utils";
import {Link, useLocation} from "react-router-dom";
import React from "react";

function MenuItem({
  label,
  active,
  icon,
  path,
}: {
  label: string;
  active: boolean;
  icon: string;
  path: string
}) {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Link to={path}>
      <div
        className={cn(
          'cutout flex items-center justify-center w-[216px] h-[92px]',
          {'bg-primary-gradient': active, 'bg-surface cursor-pointer': !active}
        )}
      >
        <div
          className={cn('flex flex-row items-center flex-1', {
            'text-white opacity-60': !active,
          })}
        >
          <div className="rounded-full bg-surface h-max w-max p-2 ml-4 mr-3">
            <img className="w-4 h-4" src={icon}/>
          </div>
          <label className="font-semibold cursor-pointer">{label}</label>
        </div>
      </div>
    </Link>
  );
}

export function Menu() {
  const pathname = useLocation().pathname;

  return (
    <div data-testid="menu" className="pt-20 bg-surface flex flex-col items-end shadow-white-right">
      <MenuItem data-testid="item" icon={home} path={"/Library"} active={pathname.includes('Library')} label={'Library'}></MenuItem>
      <MenuItem icon={settings} path={"/Settings"} active={pathname === '/Settings'} label={'Settings'}></MenuItem>
    </div>
  );
}

export default Menu;
