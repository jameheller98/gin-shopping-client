import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { IMenuData } from '../../../libs/menu/interfaces';
import { menuDataState } from '../../../state/menu/menuAtoms';
import { capitalize } from '../../../utils/common/textHelper';
import { findArrObjMenuActive } from '../../../utils/menu/menuHelper';

export type TBreadCrumb = {} & React.ComponentPropsWithoutRef<'div'>;

const BreadCrumb: React.FC<TBreadCrumb> = ({ className, ...divProps }) => {
  const router = useRouter();
  const menuData = useRecoilValue(menuDataState);
  const menuActive = findArrObjMenuActive(
    menuData,
    router.asPath.split('/').filter((path) => Boolean(path))
  ) as IMenuData[];
  const hasIdProduct = router.pathname
    .split('/')
    .some((route) => route === '[productId]');
  const arrPath = router.asPath.split('/').filter((route) => Boolean(route));
  const arrPathFinal = hasIdProduct
    ? arrPath.filter((_, idx) => idx < arrPath.length - 1)
    : arrPath;

  return arrPath.length > 1 ? (
    <div
      {...divProps}
      className={`py-1 bg-slate-200 bg-opacity-60 w-screen flex items-center justify-center ${className}`}
    >
      {menuActive.length > 0 &&
        arrPathFinal.map((path, idx) => (
          <span key={path} className="flex items-center">
            {idx > 0 && <span className="text-lg mx-2">/</span>}
            <Link href={menuActive[idx].href}>
              <a
                className={`${
                  idx === arrPath.length - 1
                    ? 'text-base font-semibold pointer-events-none'
                    : 'text-sm font-normal underline underline-offset-2 pointer-events-auto'
                }`}
              >
                {capitalize(path.replace(/\?(.*)|#/g, ''))}
              </a>
            </Link>
          </span>
        ))}
    </div>
  ) : null;
};

export default BreadCrumb;
