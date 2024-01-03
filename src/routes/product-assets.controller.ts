import express, { Request, Response } from 'express';
import {
  createProductAsset,
  deleteProductAssetById,
  getAllProductAssets,
  getAllProductAssetsWithNameProduct,
  getProductAssetById,
  updateProductAssetById,
} from '../services/product-assets.service';
const productAssetRoutes = express.Router();

productAssetRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const productAssets = await getAllProductAssets();
    return res.json(productAssets);
  } catch (error) {
    console.error('Error fetching product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productAssetRoutes.get('/detail', async (req: Request, res: Response) => {
  try {
    const productAssets = await getAllProductAssetsWithNameProduct();
    return res.json(productAssets);
  } catch (error) {
    console.error('Error fetching product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productAssetRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const productAssets = await getProductAssetById(Number(req.params.id));
    return res.json(productAssets);
  } catch (error) {
    console.error('Error fetching product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productAssetRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const productAsset = await createProductAsset(req.body);
    return res.json(productAsset);
  } catch (error) {
    console.error('Error creating product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productAssetRoutes.patch('/:id', async (req: Request, res: Response) => {
  try {
    const productAsset = await updateProductAssetById(
      Number(req.params.id),
      req.body
    );
    return res.json(productAsset);
  } catch (error) {
    console.error('Error creating product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

productAssetRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteProductAssetById(Number(req.params.id));
    return res.json({ message: 'Product asset deleted successfully' });
  } catch (error) {
    console.error('Error creating product-assets:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default productAssetRoutes;
