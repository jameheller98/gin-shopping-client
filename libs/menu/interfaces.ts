interface IMenuData {
  id: string;
  name: string;
  href: string;
  tagParam: string;
  bgColorChild: string;
  children: IMenuData[];
}

export type { IMenuData };
