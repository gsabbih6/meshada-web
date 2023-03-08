import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector';

export class Product {
  countallproducts: number = 0;
  countallstores: number = 0;
  products: Item[] = [];
  categories: string[] = [];
  stores: string[] = [];
  brands: string[] = [];
}

export class WardrobeDetail {
  wardrobe!: Wardrobe;
  productList!: Item[];
}

export class Purchase {
  id!: string;
  redeemed!: boolean;
  redeemedby!: string;
  productid!: string;
}

export class Item {
  id!: string;
  payment_url!: string;
  product_name!: string;
  image_urls!: string[];
  product_details!: string;
  price!: number;
  price_old!: number;
  brand_name: string = '';
  shipping_price?: any;
  currency!: string;
  program_name: string = '';
  store_id?: any;
  category_id!: string[];
  category_name!: string[];
  color_id?: any;
  color!: string;
  available!: boolean;
  sku!: string;
  program_icon_url!: string;
  wishListIcon: string = 'favorite';
  cashback: string = '';
}

export class Brand {
  id!: string;
  name!: string;
  logo!: string;

  constructor() {
    this.id = '';
    this.logo = '';
    this.name = '';
  }
}

export class Wardrobe {
  id!: string;
  userid!: string;
  name!: string;
  description!: string;
  productids!: string[];

  constructor() {}
}

export class Deal {
  id!: string;
  productid!: string;
  discountcode!: string;
  expirydate!: string;
  info!: string;

  constructor() {}
}

export class Discover {
  id!: string;
  thumbnail!: string;
  short_desc!: string;
  products!: Product;
}

export class EditorChoiceBrand {
  brands!: Brand[];
  // thumbnail!: string;
}

export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  name!: string;
  localey!: string;
  photourl!: string;
  wishlist: string[] = [];
  authtoken!: string;
  verifiedemail!: boolean;
  wardrobeIds: string[] = [];
  stripeId: string = '';

  constructor() {
    this.id = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.name = '';
    this.localey = '';
    this.photourl = '';
    this.wishlist = [];
    this.authtoken = '';
    this.verifiedemail = false;
    this.wardrobeIds = [];
    this.stripeId = '';
  }
}

export class Store {
  id!: string;
  name!: string;
  description!: boolean;
  logo!: boolean;
}

export class Category {
  id!: string;
  parent_id!: string;
  name!: string;
}
// index = 'product_index';
// url = ;
// credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b301';
const connector = new ElasticsearchAPIConnector({
  host: 'http://localhost:8010/proxy/',
  index: 'product_index',
});
const config = {
  searchQuery: {
    search_fields: {
      product_details: {
        weight: 3,
      },
      category_name: {},
      product_name: {},
      store_name: {},
      program_name: {},
      color: {},
    },
    result_fields: {
      product_details: {
        size: 100,
        snippet: {},
      },
      product_name: {},
      store_name: {},
      program_name: {},
      brand_name: {},
      currency: {},
      image_urls: {},
      payment_url: {},
      program_icon_url: {},
      cashback: {},
      available: {},
      price: {},
      price_old: {},
      category_name: {},
    },
    disjunctiveFacets: [
      'brand_name.keyword',
      // 'category0.keyword',
      'store_name.keyword',
      'price',
    ],
    facets: {
      'store_name.keyword': { type: 'value' },
      'brand_name.keyword': { type: 'value' },
      'category0.keyword': { type: 'value' },
      'category1.keyword': { type: 'value' },
      'category2.keyword': { type: 'value' },
      'category3.keyword': { type: 'value' },
      'category4.keyword': { type: 'value' },
      price: {
        type: 'range',
        ranges: [
          {
            from: 0,
            to: 50,
            name: '0 - 50',
          },
          {
            from: 50,
            to: 100,
            name: '50 - 100 ',
          },
          {
            from: 100,
            to: 200,
            name: '100 - 200 ',
          },
          {
            from: 200,
            name: '200+',
          },
        ],
      },
    },
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      search_fields: {
        product_details: {
          weight: 3,
        },
      },
      result_fields: {
        product_details: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
      },
    },
    suggestions: {
      types: {
        results: { fields: ['product_details'] },
      },
      size: 4,
    },
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export const CONSTANTS = { searchConfig: config };
