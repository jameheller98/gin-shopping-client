import { useRecoilValue } from 'recoil';
import { userState } from '../../../state/user/UserAtoms';

export type TUsername = {} & React.ComponentPropsWithoutRef<'h1'>;

const Username: React.FC<TUsername> = ({ className, ...h1Props }) => {
  const user = useRecoilValue(userState);

  return (
    <h1
      {...h1Props}
      className={`mr-5 text-base font-medium inline-block ${className}`}
    >
      {user?.firstName + ' ' + user?.lastName}
    </h1>
  );
};

export default Username;
