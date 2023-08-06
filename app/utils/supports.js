import { dynamoDB } from './AWS';

export const fetchFeeds = async () => {
  try {
    const productsParams = {
      TableName: 'products',
      ProjectionExpression: 'ProductTitle, ProductType, Price, ProductBackgroundImage, ProductCategory, ProductDescription, ProductMainImage, ProductShortDescription',
    };

    const categoriesParams = {
      TableName: 'category',
      ProjectionExpression: 'CategoryName, CategoryMainImage',
    };

    const [productsData, categoriesData] = await Promise.all([
      dynamoDB.scan(productsParams).promise(),
      dynamoDB.scan(categoriesParams).promise()
    ]);

    console.log('PRODUCTS DATA:', productsData);
    console.log('CATEGORIES DATA:', categoriesData);

    const categories = categoriesData.Items.reduce((map, category) => {
      map[category.CategoryName.toLowerCase()] = {
        _id: category.CategoryName,
        title: category.CategoryName,
        mainImage: category.CategoryMainImage,
      };
      return map;
    }, {});

    console.log('CATEGORIES:', categories);

    const resolvedProductsData = productsData.Items.map((product) => {
      const productCategories = product.ProductCategory.split(',').map((categoryName) =>
        categories[categoryName.trim().toLowerCase()]
      );
    
      return {
        _id: product.ProductTitle,
        title: product.ProductTitle,
        productType: product.ProductType,
        mainImage: product.ProductMainImage,
        bgImage: product.ProductBackgroundImage,
        shortDescription: product.ProductShortDescription,
        description: product.ProductDescription,
        price: parseFloat(product.Price),
        categories: productCategories.filter(Boolean),
      };
    });
    
    console.log('RESOLVED PRODUCTS DATA WITHOUT STRINGIFY:', resolvedProductsData);
    console.log('RESOLVED PRODUCTS DATA:', JSON.stringify(resolvedProductsData));
    
    return resolvedProductsData;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return [];
  }
};