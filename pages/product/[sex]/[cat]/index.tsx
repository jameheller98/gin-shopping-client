import PrimaryLayout from '../../../../components/layouts/primary/PrimaryLayout';
import { getAllLevelLinkHrefs } from '../../../../libs/product/product';
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
  console.log(params);
  return { props: {} };
}

const Category: NextPageWithLayout = () => {
  return <section></section>;
};

export default Category;

Category.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
