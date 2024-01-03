import express, { Request, Response } from 'express';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from '../services/products.service';
const productRoutes = express.Router();

productRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    return res.json(product);
  } catch (error) {
    console.error('Error creating products:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await getProductById(Number(req.params.id));
    return res.json(product);
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRoutes.patch('/:id', async (req: Request, res: Response) => {
  try {
    const product = await updateProductById(Number(req.params.id), req.body);
    return res.json(product);
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteProductById(Number(req.params.id));
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default productRoutes;
