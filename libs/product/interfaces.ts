interface IProductStock {
  id: string;
  productId: IProductData['id'];
  productSizeId: IProductSize['id'];
  numberInStock: number;
  isStock: boolean;
}

interface IProductSize {
  id: string;
  value: number;
  sex: 'male' | 'female';
  avgHeight: number;
  avgWeight: number;
}

interface IProductData {
  id: string;
  imgSrc: string[];
  sex: 'men' | 'woman' | 'unisex';
  cat: 'shirts' | 't-shirts' | 'pants';
  price: number;
  sizeIds: IProductSize['id'][];
}

export type { IProductData, IProductSize, IProductStock };
