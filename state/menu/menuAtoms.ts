import { atom } from 'recoil';
import { IMenuData } from '../../libs/menu/interfaces';

const idMenuActiveState = atom({
  key: 'IdMenuActiveState',
  default: '0',
});
const arrIdMenuOpenState = atom<IMenuData['id'][]>({
  key: 'ArrIdMenuOpenState',
  default: [],
});

const menuDataState = atom<IMenuData[]>({
  key: 'MenuDataState',
  default: [],
});

export { idMenuActiveState, arrIdMenuOpenState, menuDataState };
