import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';
import { IProductData } from '../../../libs/product/interfaces';
import {
  getAllLevelLinkHrefs,
  getAllProductBySex,
} from '../../../libs/product/product';
import { NextPageWithLayout } from '../../page';

export async function getStaticPaths() {
  const paths = getAllLevelLinkHrefs('2');

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { sex: string } }) {
  const listProduct = getAllProductBySex(params.sex);
  return { props: { listProduct } };
}

const Sex: NextPageWithLayout<{ listProduct: IProductData[] }> = ({
  listProduct,
}) => {
  console.log(listProduct);
  return <section></section>;
};

export default Sex;

Sex.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
