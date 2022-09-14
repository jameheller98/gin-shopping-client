import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import SexGallery from '../../../../components/galleries/sexGallery/SexGallery';
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
  return (
    <section className="flex flex-col p-5">
      {listProduct.length > 0 ? (
        <SexGallery listProduct={listProduct} />
      ) : (
        <div className="text-3xl h-[50vh] flex flex-col gap-5 items-center justify-center">
          <span>No item available </span>
          <WrenchScrewdriverIcon className="w-10" />
        </div>
      )}
    </section>
  );
};

export default Category;

Category.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
