import express from 'express';
const app = express();
import productRoutes from './routes/products.controller';
import categoryRoutes from './routes/categories.controller';
import productAssetRoutes from './routes/product-assets.controller';

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/product-assets', productAssetRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
