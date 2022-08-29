import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const FAQ: NextPageWithLayout = () => {
  return <section></section>;
};

export default FAQ;

FAQ.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
