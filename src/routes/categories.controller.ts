import express, { Request, Response } from 'express';
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '../services/categories.service';
const categoryRoutes = express.Router();

categoryRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const categories = await getCategoryById(Number(req.params.id));
    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body.name);
    return res.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRoutes.patch('/:id', async (req: Request, res: Response) => {
  try {
    const category = await updateCategoryById(
      Number(req.params.id),
      req.body.name
    );
    return res.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

categoryRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteCategoryById(Number(req.params.id));
    return res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default categoryRoutes;
