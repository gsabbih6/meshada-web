export class ProductItem {
  id: BrandName = new BrandName();
  _meta: Meta = new Meta();
  payment_url: BrandName = new BrandName();
  price: Price = new Price();
  price_old: Price = new Price();
  program_name: BrandName = new BrandName();
  available: Available = new Available();
  image_urls: ImageUrls = new ImageUrls();
  store_name: BrandName = new BrandName();
  brand_name: BrandName = new BrandName();
  currency: BrandName = new BrandName();
  program_icon_url: BrandName = new BrandName();
  product_details: ProductDetails = new ProductDetails();
  product_name: BrandName = new BrandName();
  cashback: Price = new Price();
}

export class Meta {
  id: string = '';
  rawHit: RawHit = new RawHit();
}

export class RawHit {
  _index!: string;
  _id!: string;
  _score!: number;
  _source: Source = new Source();
  highlight: Highlight = new Highlight();
}

export class Source {
  payment_url: string = '';
  price: number[] = [];
  program_name!: string;
  available: boolean = false;
  image_urls: string[] = [];
  store_name: string = '';
  brand_name: string = '';
  currency: string = '';
  program_icon_url: string = '';
  product_details: string = '';
  product_name: string = '';
  cashback: string = '';
}

export class Highlight {
  product_details: string[] = [];
}

export class Available {
  raw: string = 'false';
}

export class BrandName {
  raw: string = '';
}

export class ImageUrls {
  raw: string[] = [];
}

export class Price {
  raw: number = 0;
}

export class ProductDetails {
  raw: string = '';
  snippet: string[] = [];
}

//

export class FacetItem {
  'brand_name.keyword': Keyword[];
  'category0.keyword': Keyword[];
  'category1.keyword': Keyword[];
  'category2.keyword': Keyword[];
  'category3.keyword': Keyword[];
  'store_name.keyword': Keyword[];
  price: Keyword[] = [];
}

export class Keyword {
  data: data[] = [];
  type: string = '';
}

export class data {
  value: string = '';
  count: number = 0;
}
