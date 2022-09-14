import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Register: NextPageWithLayout = () => {
  return <section className="flex flex-col"></section>;
};

export default Register;

Register.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
