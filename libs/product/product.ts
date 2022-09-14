import { mockMenuProps } from '../../components/navigations/menu/Menu.mocks';
import { IMenuData } from '../menu/interfaces';
import dataProduct from './dataProduct.json';
import dataProductSize from './dataProductSize.json';
import dataProductStock from './dataProductStock.json';
import { IProductStock } from './interfaces';

export function getAllLevelLinkHrefs(idMenu: string, level = 1) {
  let results: { params: Record<string, string> }[] = [];
  const menuParent = mockMenuProps.base.arrMenu
    .filter((menu) => menu.id === idMenu)
    .pop();

  if (menuParent) {
    const handlePushArray = (
      childrenMenu: IMenuData[],
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

export function getAllProduct() {
  return dataProduct.map((data) => ({
    params: { sex: data.sex, cat: data.cat, productId: data.id },
  }));
}

export function getAllProductBySexAndCategory(
  sexName: string,
  catName: string
) {
  return dataProduct.filter(
    (data) => data.sex === sexName && data.cat === catName
  );
}

export function getAllProductBySex(sexName: string) {
  return dataProduct.filter((data) => data.sex === sexName);
}

export function getProductById(productId: string) {
  return dataProduct.find((data) => data.id === productId);
}

export function getSizesByIds(sizeIds: string[]) {
  return dataProductSize.filter((data) => sizeIds.includes(data.id));
}

export function getProductStockByProductId(productId: string): IProductStock[] {
  return dataProductStock
    .filter((data) => data.productId === productId)
    .map((data) => ({ ...data, isStock: data.numberInStock > 0 }));
}
