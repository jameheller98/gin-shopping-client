import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { idMenuActiveState } from '../../../state/menu/menuAtoms';
import { capitalize } from '../../../utils/common/textHelper';
import { findArrObjMenuActive } from '../../../utils/menu/menuHelper';
import { IMenuObject } from '../../navigations/menu/Menu';
import { mockMenuProps } from '../../navigations/menu/Menu.mocks';

export type TBreadCrumb = {} & React.ComponentPropsWithoutRef<'div'>;

const BreadCrumb: React.FC<TBreadCrumb> = ({ className, ...divProps }) => {
  const router = useRouter();
  const setIdMenuActive = useSetRecoilState(idMenuActiveState);
  const menuActive = findArrObjMenuActive(
    mockMenuProps.base.arrMenu,
    router.asPath.split('/').filter((path) => Boolean(path))
  ) as IMenuObject[];
  const arrPath = router.asPath.split('/').filter((route) => Boolean(route));

  const handleClickLink = (path: string) => {
    const findMenuActiveClicked = menuActive.find(
      (menu) => menu.href.replace(/^.*[a-z,0-9,A-Z]\/|\//g, '') === path
    );

    if (findMenuActiveClicked) {
      setIdMenuActive(findMenuActiveClicked.id);
    }
  };

  return arrPath.length > 1 ? (
    <div
      {...divProps}
      className={`py-1 bg-slate-200 bg-opacity-60 w-screen flex items-center justify-center ${className}`}
    >
      {arrPath.map((path, idx) => (
        <span key={idx} className="flex items-center">
          {idx > 0 && <span className="text-lg mx-2">/</span>}
          <Link href={menuActive[idx].href}>
            <a
              className={`${
                idx === arrPath.length - 1
                  ? 'text-base font-semibold pointer-events-none'
                  : 'text-sm font-normal underline underline-offset-2 pointer-events-auto'
              }`}
              onClick={() => handleClickLink(path)}
            >
              {capitalize(path)}
            </a>
          </Link>
        </span>
      ))}
    </div>
  ) : null;
};

export default BreadCrumb;
