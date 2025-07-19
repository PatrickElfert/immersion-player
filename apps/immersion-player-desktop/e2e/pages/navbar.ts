import { By, PageElement } from '@serenity-js/web';

export class Navbar {
  static menuIcon = PageElement.located(By.css('[data-testid="navbar-menu-icon"]'));
}
