import express from 'express';
const app = express();
import productRoutes from './routes/products.controller';
import categoryRoutes from './routes/categories.controller';
import productAssetRoutes from './routes/product-assets.controller';

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/product-assets', productAssetRoutes);

app.listen(4000, () => {
  console.log('Express server is running on port 4000');
});
