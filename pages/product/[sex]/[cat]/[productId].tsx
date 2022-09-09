import PrimaryLayout from '../../../../components/layouts/primary/PrimaryLayout';
import { IProductData } from '../../../../libs/product/interfaces';
import {
  getAllProduct,
  getProductById,
} from '../../../../libs/product/product';
import { NextPageWithLayout } from '../../../page';

export async function getStaticPaths() {
  const paths = getAllProduct();

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { sex: string; cat: string; productId: string };
}) {
  const product = getProductById(params.productId);

  return { props: { product } };
}

const ProductDetail: NextPageWithLayout<{ product: IProductData }> = ({
  product,
}) => {
  console.log(product);
  return <section></section>;
};

export default ProductDetail;

ProductDetail.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
