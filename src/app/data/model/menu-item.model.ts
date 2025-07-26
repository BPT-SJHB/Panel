export interface PageGroupItem {
  id:number,
  label: string,
  icon: string,
  command(): void;
}