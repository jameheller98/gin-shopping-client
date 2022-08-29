import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';
import { getAllLevelLinkHrefs } from '../../../libs/product/product';
import { NextPageWithLayout } from '../../page';

export async function getStaticPaths() {
  const paths = getAllLevelLinkHrefs('2');

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { sex: string } }) {
  console.log(params);
  return { props: {} };
}

const Sex: NextPageWithLayout = () => {
  return <section></section>;
};

export default Sex;

Sex.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
