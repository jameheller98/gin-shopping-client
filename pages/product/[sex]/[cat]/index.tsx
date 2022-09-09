import PrimaryLayout from '../../../../components/layouts/primary/PrimaryLayout';
import { IProductData } from '../../../../libs/product/interfaces';
import {
  getAllLevelLinkHrefs,
  getAllProductBySexAndCategory,
} from '../../../../libs/product/product';
import { NextPageWithLayout } from '../../../page';

export async function getStaticPaths() {
  const paths = getAllLevelLinkHrefs('2', 2);

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { sex: string; cat: string };
}) {
  const listProduct = getAllProductBySexAndCategory(params.sex, params.cat);

  return { props: { listProduct } };
}

const Category: NextPageWithLayout<{ listProduct: IProductData[] }> = ({
  listProduct,
}) => {
  console.log(listProduct);
  return <section></section>;
};

export default Category;

Category.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
