/* eslint-disable-next-line */
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import { cn } from '@immersion-player/shared-utils';
import { Link, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Button } from '@heroui/react';
import { useLayout } from '../useLayout.js';

function MenuItem({ label, active, icon, path }: { label: string; active: boolean; icon: ReactNode; path: string }) {
  const {toggleMenu} = useLayout();
  return (
    <Link className="m-2" to={path}>
      <Button
        onPress={() => toggleMenu(false)}
        startContent={icon}
        variant={active ? 'flat' : 'light'}
        color={active ? 'primary' : undefined}
        className="w-full justify-start"
      >
        {label}
      </Button>
    </Link>
  );
}

export function Menu() {
  const pathname = useLocation().pathname;
  const { menuOpen } = useLayout();
  return (
    <div
      data-testid="menu"
      className={`h-full bg-content1/40 backdrop-blur-md backdrop-saturate-150 w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40 absolute top-0 left-0`}
    >
      <div className="flex flex-col h-full">
        <MenuItem
          data-testid="item"
          icon={home}
          path={'/Library'}
          active={pathname.includes('Library')}
          label={'Library'}
        ></MenuItem>
        <MenuItem icon={settings} path={'/Settings'} active={pathname === '/Settings'} label={'Settings'}></MenuItem>
      </div>
    </div>
  );
}

export default Menu;
