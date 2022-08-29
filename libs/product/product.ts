import { IMenuObject } from '../../components/navigations/menu/Menu';
import { mockMenuProps } from '../../components/navigations/menu/Menu.mocks';

export function getAllLevelLinkHrefs(idMenu: string, level = 1) {
  let results: { params: Record<string, string> }[] = [];
  const menuParent = mockMenuProps.base.arrMenu
    .filter((menu) => menu.id === idMenu)
    .pop();

  if (menuParent) {
    const handlePushArray = (
      childrenMenu: IMenuObject[],
      level: number,
      countLevel = 1,
      paramsPrev?: Record<string, string>
    ) => {
      childrenMenu.forEach((menu) => {
        const params = {
          ...paramsPrev,
          [menu.tagParam]: menu.href.replace(/^.*[a-z,0-9,A-Z]\//g, ''),
        };

        if (countLevel < level) {
          handlePushArray(menu.children, level, countLevel + 1, params);
        } else {
          results.push({ params });
        }
      });
    };

    handlePushArray(menuParent.children, level);
  }

  return results;
}
