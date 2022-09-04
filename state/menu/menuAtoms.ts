import { atom } from 'recoil';
import { IMenuObject } from '../../components/navigations/menu/Menu';

const idMenuActiveState = atom({
  key: 'IdMenuActiveState',
  default: '1',
});

const arrIdMenuOpenState = atom<IMenuObject['id'][]>({
  key: 'ArrIdMenuOpenState',
  default: [],
});

export { idMenuActiveState, arrIdMenuOpenState };
