import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Login: NextPageWithLayout = () => {
  return <section className="flex flex-col"></section>;
};

export default Login;

Login.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
