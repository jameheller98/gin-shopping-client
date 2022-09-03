import { IMenuObject } from '../../components/navigations/menu/Menu';

const findObjMenu = (
  arrMenu: IMenuObject[],
  idMenu: string
): IMenuObject | null => {
  const menuFinded = arrMenu.find((menu) => menu.id === idMenu);
  if (arrMenu.length > 0 && !menuFinded) {
    return arrMenu.find((menu) => findObjMenu(menu.children, idMenu)) || null;
  } else {
    return menuFinded || null;
  }
};

const findLastObjMenu = (
  arrPath: string[],
  menu: IMenuObject,
  arrMenuActive: any[],
  fieldName: keyof IMenuObject | undefined,
  count = 1
) => {
  const currentPath = arrPath[count];
  const currentMenu = menu.children.find(
    (menu) => menu.href.replace(/^.*[a-z,0-9,A-Z]\//g, '') === currentPath
  );

  if (currentMenu) {
    findLastObjMenu(arrPath, currentMenu, arrMenuActive, fieldName, count + 1);

    arrMenuActive.push(fieldName ? currentMenu[fieldName] : currentMenu);
  }
};

const findArrObjMenuActive = (
  arrMenu: IMenuObject[],
  arrPath: string[],
  fieldName?: keyof IMenuObject
): IMenuObject[] | string[] => {
  const parent = arrMenu.find((menu) => menu.href.search(arrPath[0]) >= 0);
  const arrMenuActive: IMenuObject[] = [];
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
