import { IMenuData } from '../../libs/menu/interfaces';

const findObjMenu = (
  arrMenu: IMenuData[],
  idMenu: string
): IMenuData | null => {
  const menuFinded = arrMenu.find((menu) => menu.id === idMenu);
  if (arrMenu.length > 0 && !menuFinded) {
    return arrMenu.find((menu) => findObjMenu(menu.children, idMenu)) || null;
  } else {
    return menuFinded || null;
  }
};

const findLastObjMenu = (
  arrPath: string[],
  menu: IMenuData,
  arrMenuActive: any[],
  fieldName: keyof IMenuData | undefined,
  count = 1
) => {
  const currentPath = arrPath[count]?.replace(/\?(.*)|#/g, '');
  const currentMenu = menu.children.find(
    (menu) => menu.href.replace(/^.*[a-z,0-9,A-Z]\//g, '') === currentPath
  );

  if (currentMenu) {
    findLastObjMenu(arrPath, currentMenu, arrMenuActive, fieldName, count + 1);

    arrMenuActive.push(fieldName ? currentMenu[fieldName] : currentMenu);
  }
};

const findArrObjMenuActive = (
  arrMenu: IMenuData[],
  arrPath: string[],
  fieldName?: keyof IMenuData
): IMenuData[] | string[] => {
  const parent = arrMenu.find((menu) => menu.href.search(arrPath[0]) >= 0);
  const arrMenuActive: IMenuData[] = [];
  const arrFieldNameMenu: string[] = [];

  if (parent) {
    findLastObjMenu(
      arrPath,
      parent,
      fieldName ? arrFieldNameMenu : arrMenuActive,
      fieldName
    );

    return fieldName
      ? arrFieldNameMenu.concat(parent[fieldName] as string).reverse()
      : arrMenuActive.concat(parent).reverse();
  }

  return fieldName ? arrFieldNameMenu : arrMenuActive;
};

export { findObjMenu, findArrObjMenuActive };
