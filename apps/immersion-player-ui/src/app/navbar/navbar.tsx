import { useBreadcrumbs } from '../breadcrumb/useBreadcrumbs.js';
import { KnownWordsDisplay } from '@immersion-player/feature-known-words-ui';
import { Button, Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import './loader.css';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useLayout } from '../useLayout.js';

export function Navbar() {
  const { current } = useBreadcrumbs();
  const { toggleMenu } = useLayout();

  return (
    <HeroNavbar maxWidth="full" isBordered={true}>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button
            data-testid={"navbar-menu-button"}
            onPress={() => toggleMenu()}
            isIconOnly
            variant="light"
          >
            <HamburgerMenuIcon className="w-6 h-6" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <p className="font-bold text-inherit">{current}</p>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <KnownWordsDisplay />
      </NavbarContent>
    </HeroNavbar>
  );
}
