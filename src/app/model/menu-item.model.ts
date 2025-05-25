export interface MenuItemData {
  label: string,
  icon: string,
  command(): void;
}