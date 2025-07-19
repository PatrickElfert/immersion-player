import { Task, Wait } from '@serenity-js/core';
import { Click, Key } from '@serenity-js/web';
import { Menu } from '../pages/menu.js';
import { Navbar } from '../pages/navbar.js';
import { equals } from '@serenity-js/assertions';

export class NavigateByMenu {
  static toPage = (page: string) =>
    Task.where(`#actor navigates to ${page} via the menu`, Click.on(Navbar.menuIcon),
      Wait.until(Menu.itemNamed(page).isPresent(), equals(true)),
      Click.on(Menu.itemNamed(page)));
}
