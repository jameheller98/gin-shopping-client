import ProductCard from '../../../../components/cards/productCard/ProductCard';
import PrimaryLayout from '../../../../components/layouts/primary/PrimaryLayout';
import {
  IProductData,
  IProductSize,
  IProductStock,
} from '../../../../libs/product/interfaces';
import {
  getAllProduct,
  getProductById,
  getProductStockByProductId,
  getSizesByIds,
} from '../../../../libs/product/product';
import { NextPageWithLayout } from '../../../page';

export type TProductDetail = {
  product?: IProductData;
  productSizes: IProductSize[];
  productStock: IProductStock[];
};

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
  const productSizes = product && getSizesByIds(product.sizeIds);
  const productStock = getProductStockByProductId(params.productId);

  return { props: { product, productSizes, productStock } };
}

const ProductDetail: NextPageWithLayout<TProductDetail> = ({
  product,
  productSizes,
  productStock,
}) => {
  return (
    <section>
      {product ? (
        <ProductCard
          product={product}
          productSizes={productSizes}
          productStock={productStock}
          className="mx-10 mt-5"
        />
      ) : (
        <>Sorry the product is not available!</>
      )}
    </section>
  );
};

export default ProductDetail;

ProductDetail.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
