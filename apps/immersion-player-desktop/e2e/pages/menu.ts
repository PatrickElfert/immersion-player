import { By, PageElements, Text } from '@serenity-js/web';
import { equals } from '@serenity-js/assertions';

export class Menu {
  static itemNamed = (label: string) =>
    Menu.items.where(Text, equals(label)).describedAs(`menu item named '${label}'`).first();
  static items =  PageElements.located(By.css('[data-testid="menu-item"]')).describedAs('menu items');
}
