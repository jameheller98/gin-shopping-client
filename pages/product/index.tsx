import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from '../page';

const Product: NextPageWithLayout = () => {
  return <section></section>;
};

export default Product;

Product.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
