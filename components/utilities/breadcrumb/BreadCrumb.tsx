import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { arrMenuActiveFromQueryState } from '../../../state/menu/menuSelectors';
import { capitalize } from '../../../utils/utilitiesHelper';

export type TBreadCrumb = {} & React.ComponentPropsWithoutRef<'div'>;

const BreadCrumb: React.FC<TBreadCrumb> = ({ className, ...divProps }) => {
  const router = useRouter();
  const hrefMenuActive = useRecoilValue(
    arrMenuActiveFromQueryState({
      query: router.query,
      parentName: router.route.split('/').filter((route) => Boolean(route))[0],
      fieldName: 'href',
    })
  );
  const arrPath = router.asPath.split('/').filter((route) => Boolean(route));

  return arrPath.length > 1 ? (
    <div
      {...divProps}
      className={`py-1 bg-slate-200 bg-opacity-60 w-screen flex items-center justify-center ${className}`}
    >
      {arrPath.map((path, idx) => (
        <span key={idx} className="flex items-center">
          {idx > 0 && <span className="text-lg mx-2">/</span>}
          <Link href={hrefMenuActive[idx]}>
            <a
              className={`${
                idx === arrPath.length - 1
                  ? 'text-base font-semibold pointer-events-none'
                  : 'text-sm font-normal underline underline-offset-2 pointer-events-auto'
              }`}
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
